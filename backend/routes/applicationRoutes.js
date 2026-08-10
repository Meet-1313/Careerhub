import express from 'express';
import {applyToJob,getApplicantsforJob,getMyApplications,updateApplicationStatus,deleteApplication
    ,getApplicationById
} from '../controllers/applicationController.js';
import {verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/',verifyToken,applyToJob);
router.get('/job/:jobId',verifyToken,getApplicantsforJob);  
router.get('/me',verifyToken,getMyApplications);
router.put("/:applicationId", verifyToken, updateApplicationStatus);
router.delete("/:applicationId", verifyToken, deleteApplication);
router.get(
    "/:applicationId",
    verifyToken,
    getApplicationById
);

export default router;

