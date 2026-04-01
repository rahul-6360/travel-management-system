import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "../style/auth.css";
import registerImg from "../assets/images/register.png";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", user);
      alert("Register successful ");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <section className="auth_section">
      <Container>
        <Row className="justify-content-center align-items-center">

          {/* IMAGE */}
          <Col lg="6" className="d-none d-lg-block">
            <img src={registerImg} alt="" className="auth_img"/>
          </Col>

          {/* FORM */}
          <Col lg="5">
            <div className="auth_card">
              <h2 className="auth_title">
                <i className="ri-user-add-line"></i> Register
              </h2>

              <Form onSubmit={submitHandler}>

                <FormGroup className="auth_input">
                  <i className="ri-user-3-line"></i>
                  <input
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="auth_input mt-3">
                  <i className="ri-mail-line"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="auth_input mt-3">
                  <i className="ri-lock-password-line"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />
                </FormGroup>

                <Button className="auth_btn w-100 mt-4">
                  Register
                </Button>

                <p className="auth_text mt-3">
                  Already have account?
                  <Link to="/login"> Login</Link>
                </p>

              </Form>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}