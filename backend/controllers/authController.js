import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import path from "path";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, email, password: hashedPassword, role
        });
        res.status(201).json({ success: true, message: 'Registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ success: false, message: 'Server error' });
    }
}

export const getCurrentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}



export const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

         if (user.resume?.publicId) {
            await cloudinary.uploader.destroy(
                user.resume.publicId,
                {
                    resource_type: "raw",
                }
            );
        }

        user.resume = {
            url: req.file.path,
            publicId: req.file.filename,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: user.resume,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};


export const updateProfile = async (req, res) => {

    try {

        const { username, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.username = username;
        user.email = email;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};