const Tour = require("../models/Tour");

exports.getTours = async (req, res) => {
  const tours = await Tour.find().sort({ createdAt: -1 });
  res.json(tours);
};

exports.getTourById = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return res.status(404).json({ message: "Tour not found" });
  res.json(tour);
};

exports.createTour = async (req, res) => {
  const tour = await Tour.create(req.body);
  res.status(201).json(tour);
};