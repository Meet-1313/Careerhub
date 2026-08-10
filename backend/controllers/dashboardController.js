import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getRecruiterDashboard = async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ message: 'Only recruiters can access this dashboard' });
        }
        const totalCompanies = await Company.countDocuments({
            createdBy: req.user._id
        });
        const totalJobs = await Job.countDocuments({
            createdBy: req.user._id
        });
        const jobs = await Job.find({
            createdBy: req.user._id
        });
        const jobIds = jobs.map(job => job._id);

        const totalApplications = await Application.countDocuments({
            job: { $in: jobIds }
        });
        const acceptedApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: 'Accepted'
        });
        const rejectedApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: "Rejected",
        });
        const pendingApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: "Pending",
        });
        res.status(200).json({
            success: true,
            dashboard: {
                totalCompanies,
                totalJobs,
                totalApplications,
                acceptedApplications,
                rejectedApplications,
                pendingApplications,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}