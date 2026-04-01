import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../style/auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const email = localStorage.getItem("resetEmail");

  const submit = () => {
    if (!password) return alert("Enter new password");

    // demo: just show success (no backend)
    alert(`Password changed for ${email || "your account"}  (Demo)`);
    localStorage.removeItem("resetEmail");
    navigate("/login");
  };

  return (
    <section className="auth_section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5">
            <div className="auth_card text-center">
              <h2 className="auth_title">
                <i className="ri-shield-keyhole-line"></i> Reset Password
              </h2>

              <div className="auth_input mt-4">
                <i className="ri-lock-password-line"></i>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="auth_btn w-100 mt-4" onClick={submit}>
                Update Password
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}