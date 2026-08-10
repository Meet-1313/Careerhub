import express from 'express';
import { registerUser,loginUser,getCurrentUser,uploadResume,updateProfile } from '../controllers/authController.js';
import { verifyToken }  from '../middleware/authMiddleware.js';
import upload from "../middleware/uploadResume.js";

const router = express.Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.get('/me',verifyToken, getCurrentUser);
router.put(
    "/resume",
    verifyToken,
    upload.single("resume"),
    uploadResume
);
router.put(
    "/profile",
    verifyToken,
    updateProfile
);
export default router;