import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// get profile
router.get("/me", async(req,res)=>{
  const user = await User.findById(req.headers.userid).select("-password");
  res.json(user);
});

// update
router.put("/update", async(req,res)=>{
  const {name,password} = req.body;

  let data={name};

  if(password){
    const hashed = await bcrypt.hash(password,10);
    data.password=hashed;
  }

  await User.findByIdAndUpdate(req.headers.userid,data);
  res.json({message:"updated"});
});

// delete
router.delete("/delete", async(req,res)=>{
  await User.findByIdAndDelete(req.headers.userid);
  res.json({message:"deleted"});
});

export default router;