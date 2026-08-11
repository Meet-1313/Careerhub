import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const createCompany = async (req,res) => {
    try{
        const { name,description,website,location,logo} = req.body;

         const existingCompany = await Company.findOne({
            name: { $regex: `^${name}$`, $options: "i" }
        });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "A company with this name already exists"
            });
        }
        const company = await Company.create({
            name,description,website,location,logo,createdBy:req.user._id
        });
        res.status(201).json({ success: true, message: 'Company created successfully', company });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getCompanies = async (req,res) => {
    try{
        const companies = await Company.find().populate('createdBy', 'username email role');
        res.status(200).json({ success: true, companies });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });  
    }
}

export const getCompanyById = async(req,res) => {
    try{
        const {id} = req.params;
        const company = await Company.findById(id).populate('createdBy', 'username email role');

        if(!company){
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        res.status(200).json({ success: true, company });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const updateCompany = async(req,res) => {
    try{
        const { id } = req.params;
        // Only recruiters can update companies
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({
                success: false,
                message: 'Only recruiters can update companies'
            });
        }

        const company = await Company.findById(id);
        if(!company){
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        if(company.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        } 
        const updatedCompany = await Company.findByIdAndUpdate(
            id, req.body, {new:true}
        );
        res.status(200).json({ success: true, message: 'Company updated successfully', company: updatedCompany });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteCompany = async(req,res) => {
    try{
        const { id } = req.params;

        const company = await Company.findById(id);

        if(!company){
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        if(company.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const jobs = await Job.find({ company: id }).select('_id');
        const jobIds = jobs.map(job => job._id);
        await Application.deleteMany({ job: { $in: jobIds } });
        await Job.deleteMany({ company: id });

        await Company.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Company deleted successfully' });

    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getMyCompanies = async (req, res) => {
    try {

        if (req.user.role !== "recruiter") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { page = 1, limit = 10} = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const totalCompanies = await Company.countDocuments({ createdBy: req.user._id });

        const companies = await Company.find({
            createdBy: req.user._id,
        }).skip(skip).limit(limitNumber);

        res.status(200).json({
            success: true,
            companies,currentPage:pageNumber,totalPages: Math.ceil(totalCompanies / limitNumber),
            totalCompanies
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};