import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";
import "../style/auth.css";
import loginImg from "../assets/images/login.png";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id || res.data.user._id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful ");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <section className="auth_section">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg="6" className="d-none d-lg-block">
            <img src={loginImg} alt="login" className="auth_img" />
          </Col>

          <Col lg="5">
            <div className="auth_card">
              <h2 className="auth_title">
                <i className="ri-login-circle-line"></i> Login Account
              </h2>

              <Form onSubmit={submitHandler}>
                <FormGroup className="auth_input">
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
                    placeholder="Enter password"
                    required
                    onChange={handleChange}
                  />
                </FormGroup>

                {/*  Forgot password link */}
                <div className="text-end mt-2">
                  <Link to="/forgot-password" className="forgot_link">
                    Forgot Password?
                  </Link>
                </div>

                <Button className="auth_btn w-100 mt-3">Login Now</Button>

                <p className="auth_text mt-3">
                  New user?
                  <Link to="/register"> Create account</Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}