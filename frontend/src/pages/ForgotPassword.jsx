import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../style/auth.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!email) return alert("Enter email");

    //  demo: save email for reset page
    localStorage.setItem("resetEmail", email);

    alert("Reset link sent");
    navigate("/reset-password");
  };

  return (
    <section className="auth_section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5">
            <div className="auth_card text-center">
              <h2 className="auth_title">
                <i className="ri-key-line"></i> Forgot Password
              </h2>

              <div className="auth_input mt-4">
                <i className="ri-mail-line"></i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button className="auth_btn w-100 mt-4" onClick={submit}>
                Send Reset Link
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}