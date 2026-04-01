import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { api } from "../utils/api";
import "../style/profile.css";

export default function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/users/me", { headers: { userid: userId } });
        setName(res.data.name || "");
      } catch (e) {
        console.log(e);
      }
    };

    if (userId) getUser();
  }, [userId]);

  const updateProfile = async (e) => {
    e?.preventDefault();
    try {
      await api.put("/users/update", { name, password }, { headers: { userid: userId } });
      setPassword("");
      alert("Profile updated ");
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  const deleteAccount = async () => {
    const ok = window.confirm("Are you sure you want to delete your account?");
    if (!ok) return;

    try {
      await api.delete("/users/delete", { headers: { userid: userId } });
      localStorage.clear();
      alert("Account deleted ");
      window.location = "/";
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="profile_section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="profile_card">
              <CardBody>
                {/* Header */}
                <div className="profile_header">
                  <div className="profile_avatar">
                    <i className="ri-user-3-line"></i>
                  </div>

                  <div>
                    <h3 className="profile_title">My Profile</h3>
                    <p className="profile_subtitle">Update your account details</p>
                  </div>
                </div>

                {/* Form */}
                <Form onSubmit={updateProfile} className="mt-4">
                  <FormGroup>
                    <Label className="profile_label">
                      <i className="ri-user-line"></i> Name
                    </Label>
                    <Input
                      className="profile_input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </FormGroup>

                  <FormGroup className="mt-3">
                    <Label className="profile_label">
                      <i className="ri-lock-password-line"></i> New Password
                    </Label>
                    <Input
                      className="profile_input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password (optional)"
                    />
                    <small className="profile_hint">
                      Leave blank if you don’t want to change password.
                    </small>
                  </FormGroup>

                  {/* Buttons */}
                  <div className="profile_btns mt-4">
                    <Button type="submit" className="profile_btn_update">
                      <i className="ri-save-3-line"></i> Update
                    </Button>

                    <Button type="button" className="profile_btn_delete" onClick={deleteAccount}>
                      <i className="ri-delete-bin-6-line"></i> Delete
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>

            <p className="profile_note">
              <i className="ri-information-line"></i> Your changes will be saved securely.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}