import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Badge } from "reactstrap";
import { api } from "../utils/api";
import "../style/my-bookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/bookings/me");
    setBookings(res.data);
  };

  useEffect(() => {
    load().catch(() => alert("Please login to view bookings"));
  }, []);

  // PAY NOW (mock payment)
  const payNow = async (bookingId) => {
    try {
      await api.post(`/payment/pay/${bookingId}`);
      alert("Payment Successful ");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      alert("Cancelled ");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <section className="mybookings_section">
      <Container>
        <div className="mybookings_header">
          <h2>
            <i className="ri-ticket-2-line"></i> My Bookings
          </h2>
          <p>View your tour history, payment status and manage bookings.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty_state">
            <i className="ri-calendar-close-line"></i>
            <h5>No bookings yet</h5>
            <p>Book a tour to see it here.</p>
          </div>
        ) : (
          <Row className="mt-3">
            {bookings.map((b) => {
              const paid = b.paymentStatus === "paid";
              return (
                <Col lg="6" key={b._id} className="mb-4">
                  <Card className="booking_card">
                    <CardBody>
                      <div className="booking_top">
                        <div>
                          <h5 className="booking_title">{b.tour?.title}</h5>
                          <div className="booking_city">
                            <i className="ri-map-pin-2-line"></i> {b.tour?.city}
                          </div>
                        </div>

                        <Badge className={paid ? "status_paid" : "status_pending"}>
                          {paid ? "PAID" : "PENDING"}
                        </Badge>
                      </div>

                      <div className="booking_info">
                        <div className="info_item">
                          <i className="ri-user-3-line"></i>
                          <span>Guests:</span> <b>{b.guestSize}</b>
                        </div>

                        <div className="info_item">
                          <i className="ri-calendar-event-line"></i>
                          <span>Date:</span> <b>{b.bookAt}</b>
                        </div>

                        <div className="info_item">
                          <i className="ri-phone-line"></i>
                          <span>Phone:</span> <b>{b.phone}</b>
                        </div>
                      </div>

                      <div className="booking_actions">
                        <Button
                          color="danger"
                          outline
                          className="action_btn"
                          onClick={() => cancelBooking(b._id)}
                        >
                          <i className="ri-close-circle-line"></i> Cancel
                        </Button>

                        {!paid ? (
                          <Button
                            color="success"
                            className="action_btn pay_btn"
                            onClick={() => payNow(b._id)}
                          >
                            <i className="ri-bank-card-line"></i> Pay Now
                          </Button>
                        ) : (
                          <Button color="secondary" className="action_btn" disabled>
                            <i className="ri-checkbox-circle-line"></i> Paid
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </section>
  );
}