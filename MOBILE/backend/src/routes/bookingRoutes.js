import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
router.post("/", protect, async (req, res) => {
    const { carId, carName, date, price, image } = req.body;

    if (!carId || !carName || !date || !price) {
        return res.status(400).json({ message: "Please add all fields" });
    }

    try {
        const booking = await Booking.create({
            user: req.user._id,
            carId,
            carName,
            date,
            price,
            image,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: "Invalid booking data" });
    }
});

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
router.get("/", protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Make sure the logged in user matches the booking user
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "User not authorized" });
        }

        await booking.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
