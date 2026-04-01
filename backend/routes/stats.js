import express from "express";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const totalTours = await Tour.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalUsers = await User.countDocuments();

  res.json({ totalTours, totalBookings, totalUsers });
});

export default router;