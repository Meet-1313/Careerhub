import express from 'express';
import { createJob,getJobs,getJobById,updateJob,deleteJob,getMyJobs } from '../controllers/jobController.js';
import { applyToJob } from '../controllers/applicationController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createJob);
router.get('/', getJobs);
router.get("/my-jobs", verifyToken, getMyJobs);
router.get("/:id",verifyToken, getJobById);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);
router.post("/:jobId/apply", verifyToken, applyToJob);


export default router;