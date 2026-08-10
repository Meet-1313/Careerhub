import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "careerhub/resumes",
        resource_type: "raw",
        format: "pdf",
    },
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }

};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;