import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>

          {/* Logo + about */}
          <Col lg="3" md="6" className="mb-4">
            <h4 className="footer__logo">TRAVELWORLD</h4>
            <p>
              Explore the world with us. Best tours, best prices and best experience.
            </p>

            <div className="footer__social">
              <span><i className="ri-youtube-line"></i></span>
              <span><i className="ri-github-line"></i></span>
              <span><i className="ri-facebook-line"></i></span>
              <span><i className="ri-instagram-line"></i></span>
            </div>
          </Col>

          {/* Discover */}
          <Col lg="3" md="6" className="mb-4">
            <h5>Discover</h5>
            <ul className="footer__links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/home#about">About</Link></li>
              <li><Link to="/tours">Tours</Link></li>
            </ul>
          </Col>

          {/* Quick links */}
          <Col lg="3" md="6" className="mb-4">
            <h5>Quick Links</h5>
            <ul className="footer__links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/my-bookings">My Booking</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg="3" md="6" className="mb-4">
            <h5>Contact</h5>
            <ul className="footer__contact">
              <li>
                <i className="ri-map-pin-line"></i> Solapur, India
              </li>
              <li>
                <i className="ri-mail-line"></i> travel@gmail.com
              </li>
              <li>
                <i className="ri-phone-line"></i> +91 9876543210
              </li>
            </ul>
          </Col>

          {/* bottom */}
          <Col lg="12">
            <div className="footer__bottom text-center">
              <p>
                © {year} TravelWorld | Developed by Bhumika
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;