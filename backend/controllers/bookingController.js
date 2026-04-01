const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.userId });
  res.status(201).json(booking);
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.userId }).populate("tour");
  res.json(bookings);
};