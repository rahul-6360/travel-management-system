import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "../style/tour-details.css";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        alert("Tour not found ");
      }
    })();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login first");
      navigate("/login");
      return;
    }

    try {
      await api.post("/bookings", {
        tour: id,
        ...form,
      });
      alert("Booking success ");
      navigate("/my-bookings");
    } catch {
      alert("Booking failed");
    }
  };

  if (!tour) return <h3 style={{padding:"40px"}}>Loading...</h3>;

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <img className="tour_details_img" src={tour.photo} alt="" />
            <h2 className="mt-3">{tour.title}</h2>

            <div className="tour_meta">
              <span><i className="ri-map-pin-line"></i> {tour.city}</span>
              <span><i className="ri-star-fill"></i> {tour.avgRating}</span>
              <span className="price">₹{tour.price}</span>
            </div>

            <p className="mt-3">{tour.desc}</p>
          </Col>

          <Col lg="4">
            <div className="booking_box">
              <h4>Book Tour</h4>

              <form onSubmit={submitBooking} className="booking_form">
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="number" name="guestSize" placeholder="Guests" onChange={handleChange} required />
                <input type="date" name="bookAt" onChange={handleChange} required />

                <button className="btn booking_btn w-100">Book Now</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}