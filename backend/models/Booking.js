import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
 user:{type:mongoose.Types.ObjectId,ref:"User"},
 tour:{type:mongoose.Types.ObjectId,ref:"Tour"},
 fullName:String,
 phone:String,
 guestSize:Number,
 bookAt:String,
 paymentStatus:{type:String,default:"pending"}   // add
},{timestamps:true});

export default mongoose.model("Booking", bookingSchema);