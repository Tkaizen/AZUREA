import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (userid) => {
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
router.post("/register", async (req, res) => {

    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existentEmail = await User.findOne({ email });
        if (existentEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const existentUsername = await User.findOne({ username });
        if (existentUsername) {
            return res.status(400).json({ message: "Username already in use" });
        }



        const newUser = new User({
            username,
            password,
            email
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({
            token,
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,


        });

    } catch (error) {
        console.log("Error during user registration:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

});



router.post("/login", async (req, res) => {

    res.json({ message: "User logged in" });

});

export default router;

