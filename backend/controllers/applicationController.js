import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const applyToJob = async (req,res) => {
    try{
        const { jobId } = req.params;
        //only job seekers can apply to jobs
        if(req.user.role !== 'jobseeker'){
            return res.status(403).json({message: 'Only job seekers can apply to jobs'});
        }
        //check if job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }
        //recruiter cant apply to theri own job
        if(job.createdBy.toString() === req.user._id.toString()){
            return res.status(403).json({message: 'You cannot apply to your own job'});
        }
        //check if user has already applied to the job
        const existingApplication = await Application.findOne({
            applicant: req.user._id,job: jobId
        });
        if(existingApplication){
            return res.status(400).json({message: 'You have already applied to this job'});
        }
        //create new application
        const application = await Application.create({
            applicant: req.user._id, job: jobId
        });
        res.status(201).json({message: 'Application submitted successfully', application});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}


export const getApplicantsforJob = async (req,res) => {
    try{
        const { jobId } = req.params;
        if(req.user.role !== 'recruiter'){
            return res.status(403).json({message: 'Only recruiters can view applicants'});
        }

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const totalApplications = await Application.countDocuments({ job: jobId });
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }
        if(job.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'You are not authorized to view applicants for this job'});   
        }
        const applications = await Application.find({job: jobId})
            .skip(skip)
            .limit(limitNumber)
            .populate('applicant','username email resume' );
        res.status(200).json({applications,currentPage:pageNumber,
                totalPages: Math.ceil(totalApplications / limitNumber),
                totalApplications
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

export const getMyApplications = async (req,res) => {
    try{
        if(req.user.role !== 'jobseeker'){
            return res.status(403).json({message: 'Only job seekers can view their applications'});
        }

        const { page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const totalApplications = await Application.countDocuments({ applicant: req.user._id });

        const applications = await Application.find({
            applicant: req.user._id
        })
            .skip(skip)
            .limit(limitNumber).populate({
            path: 'job',
            populate:{
                path: 'company',select: 'name location website logo'
            }
        });
        res.status(200).json({applications,currentPage:pageNumber,
                totalPages: Math.ceil(totalApplications / limitNumber),
                totalApplications
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

export const updateApplicationStatus = async (req,res) => {
    try{
        const { applicationId } = req.params;
        const { status } = req.body;
        if(req.user.role !== 'recruiter'){
            return res.status(403).json({message: 'Only recruiters can update application status'});
        }
        const application = await Application.findById(applicationId).populate('job');
        if(!application){
            return res.status(404).json({message: 'Application not found'});
        }
        if(application.job.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'You are not authorized to update this application status'});
        }
        application.status = status;
        await application.save();
        res.status(200).json({message: 'Application status updated successfully', application});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

export const deleteApplication = async (req,res) => {
    try{
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({message: 'Application not found'});
        }
        if(application.applicant.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'You are not authorized to delete this application'});
        }
        await application.deleteOne();
        res.status(200).json({message: 'Application deleted successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

export const getApplicationById = async (req, res) => {

    try {

        const { applicationId } = req.params;

        if (req.user.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can view applications",
            });
        }

        const application = await Application.findById(applicationId)
            .populate(
                "applicant",
                "username email resume"
            )
            .populate({
                path: "job",
                select: "title company createdBy",
                populate: {
                    path: "company",
                    select: "name",
                },
            });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        if (
            application.job.createdBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        res.status(200).json({
            application,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error",
        });

    }

};