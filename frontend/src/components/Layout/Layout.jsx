import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import TourDetails from "../../pages/TourDetails";
import MyBookings from "../../pages/MyBookings";
import Profile from "../../pages/Profile";
import Tours from "../../pages/Tours";
import ManageTours from "../../pages/ManageTours";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";


const Layout = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* tour */}
        <Route path="/tours/:id" element={<TourDetails />} />

        {/* booking */}
        <Route path="/my-bookings" element={<MyBookings />} />
        
        <Route path="/profile" element={<Profile />} />

        <Route path="/tours" element={<Tours/>}/>

        <Route path="/manage-tours" element={<ManageTours/>}/>

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

      

      <Footer />
    </>
  );
};

export default Layout;