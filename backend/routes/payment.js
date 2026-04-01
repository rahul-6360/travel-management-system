import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/pay/:bookingId", async(req,res)=>{
 const {bookingId}=req.params;

 await Booking.findByIdAndUpdate(bookingId,{
   paymentStatus:"paid"
 });

 res.json({message:"Payment successful"});
});

export default router;