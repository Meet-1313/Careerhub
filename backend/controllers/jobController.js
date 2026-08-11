import Job from "../models/Job.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const createJob = async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({
                success: false,
                message: 'Only recruiters can create companies'
            });
        }
        const { title, description, location, salary, experience, jobType, company } = req.body;

        //only recruiter can create job
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        //check if company exists 
        const companyData = await Company.findById(company);
        if (!companyData) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        //check if the user is the owner of the company
        if (companyData.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        //create job
        const job = await Job.create({
            title,
            description,
            salary,
            location,
            experience,
            jobType,
            company,
            createdBy: req.user._id,
        });
        res.status(201).json({ success: true, message: 'Job created successfully', job });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getJobs = async (req, res) => {
    try {
        const { search, location, jobType, experience, page = 1, limit = 10, sort } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        let sortOption = { createdAt: -1 }; //default sort by createdAt descending
        if (sort === "newest") {
            sortOption = { createdAt: -1 };
        }
        if (sort === "oldest") {
            sortOption = { createdAt: 1, };
        }
        if (sort === "salary_asc") {
            sortOption = { salary: 1, };
        }
        if (sort === "salary_desc") {
            sortOption = { salary: -1, };
        }
        let query = {};
        if (search) {
            query.$or =
                [
                    {
                        title:
                            { $regex: search, $options: 'i' }
                    },
                    {
                        description:
                            { $regex: search, $options: 'i' }
                    }
                ]
        }
        //filter by location
        if (location) {
            query.location = {
                $regex: location,
                $options: "i",
            }
        }
        // Filter by job type
        if (jobType) {
            query.jobType = jobType;
        }
        // Filter by experience
        if (experience) {
            query.experience = {
                $gte: Number(experience)
            };
        }
        const totalJobs = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber)
            .populate('company', 'name location website logo')
            .populate('createdBy', 'username email role');
        res.status(200).json({
            success: true,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalJobs / limitNumber),
            totalJobs,
            jobs
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate('company', 'name location website logo').
            populate('createdBy', 'username email role');
        const alreadyApplied = await Application.findOne({
            applicant: req.user._id,
            job: id,
        });
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, job, alreadyApplied: !!alreadyApplied });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const updateJob = async (req, res) => {
    try {

        const { id } = req.params;
        //only recruiter can update job
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        //check owner of the job
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const {
            title,
            description,
            location,
            salary,
            experience,
            jobType
        } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            id, {
            title,
            description,
            location,
            salary,
            experience,
            jobType
        }, { new: true, runValidators: true },
        ).populate('company', 'name location website logo').populate('createdBy', 'username email role');
        res.status(200).json({ success: true, message: 'Job updated successfully', job: updatedJob });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        //only recruiter can delete job
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        //check owner of the job
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        // Delete all applications for this job
        await Application.deleteMany({
            job: id
        });
        await Job.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getMyJobs = async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: 'Only recruiters can view their jobs' });
        }

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const totalJobs = await Job.countDocuments({ createdBy: req.user._id });

        const jobs = await Job.find({
            createdBy: req.user._id,
        })
            .skip(skip)
            .limit(limitNumber)
            .populate('company', 'name location logo')
            .sort({ createdAt: -1 });
        res.status(200).json({
            jobs, currentPage: pageNumber,
            totalPages: Math.ceil(totalJobs / limitNumber),
            totalJobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}