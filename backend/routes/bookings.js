import express from "express";
import Booking from "../models/Booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Create booking (protected)
router.post("/", auth, async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.userId });
  res.status(201).json(booking);
});

// My bookings (protected)
router.get("/me", auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.userId }).populate("tour");
  res.json(bookings);
});

//my booking history

router.delete("/:id", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (String(booking.user) !== String(req.userId))
    return res.status(403).json({ message: "Not allowed" });

  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking cancelled ✅" });
});

export default router;