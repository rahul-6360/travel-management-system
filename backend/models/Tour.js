import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    distance: { type: Number, default: 0 },      
    maxGroupSize: { type: Number, default: 1 },  
    featured: { type: Boolean, default: false },
    avgRating: { type: Number, default: 0 },
    reviews: { type: Array, default: [] },
    desc: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);