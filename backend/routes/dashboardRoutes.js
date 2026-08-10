import express from 'express';
import{verifyToken} from '../middleware/authMiddleware.js';
import { getRecruiterDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/recruiter',verifyToken,getRecruiterDashboard);

export default router;