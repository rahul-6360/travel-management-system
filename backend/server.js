import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import toursRoute from "./routes/tours.js";
import bookingsRoute from "./routes/bookings.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import statsRoute from "./routes/stats.js";
import paymentRoute from "./routes/payment.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URI:", process.env.MONGO_URI); //  debug

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(" DB error:", err.message));

app.get("/", (req, res) => res.send("API running "));

app.use("/api/auth", authRoute);

app.use("/api/tours", toursRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/users", userRoute);

app.use("/api/stats", statsRoute);
app.use("/api/payment",paymentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));