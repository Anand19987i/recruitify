import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { setAuthToken } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        if (!req.file) {
            return res.status(400).json({
                message: "Profile photo is required.",
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profilePhoto: cloudResponse.secure_url,
        });
        return setAuthToken(newUser, res);

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Please provide all required fields.',
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password.',
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: 'Incorrect email or password.',
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the specified role.",
                success: false,
            });
        }

        // Set the authentication token
        setAuthToken(user, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error.',
            success: false,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
};

export const autoLogin = async (req, res) => {
    try {
        const user = req.user; // Populated by `isAuthenticated` middleware
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User authenticated.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const { id } = req.params;
        console.log(id);

        const file = req.file; // Ensure this is set by multer
        let cloudResponse = {};
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, { folder: 'resumes' });
        }

        const skillsArray = skills ? skills.split(",") : [];

        // Get user ID from request params
        let user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false });
        }

        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.bio = bio || user.bio;
        user.skills = skillsArray.length ? skillsArray : user.skills;

        if (cloudResponse.secure_url) {
            user.resume = cloudResponse.secure_url;
            user.resumeOriginalName = file.originalname
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error.", success: false });
    }
};
