import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

// GET all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    return res.json(tours);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET tour by id
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    return res.json(tour);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// CREATE tour
router.post("/", async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    return res.status(201).json(tour);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// UPDATE tour
router.put("/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    return res.json(tour);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// DELETE tour
router.delete("/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    return res.json({ message: "Tour deleted Successfully"})
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;