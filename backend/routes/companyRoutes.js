import express from 'express';
import { createCompany,getCompanies,getCompanyById,updateCompany,deleteCompany,getMyCompanies } from '../controllers/companyController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createCompany);
router.get('/', getCompanies);
router.get("/my-companies", verifyToken, getMyCompanies);
router.get("/:id", getCompanyById);
router.put("/:id", verifyToken, updateCompany);
router.delete("/:id", verifyToken, deleteCompany);

export default router;  