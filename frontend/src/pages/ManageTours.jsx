import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { api } from "../utils/api";
import "../style/manage.css";

const EMPTY_FORM = {
  title: "",
  city: "",
  price: "",
  photo: "",
  distance: "",
  maxGroupSize: "",
};

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);

  // get tours
  const getTours = async () => {
    try {
      const res = await api.get("/tours");
      setTours(res.data);
    } catch (e) {
      alert("Failed to load tours");
    }
  };

  useEffect(() => {
    getTours();
  }, []);

  // add/update
  const submitTour = async () => {
    // ✅ basic validation (avoid empty)
    if (!form.title || !form.city || !form.price || !form.photo) {
      return alert("Please fill Title, City, Price, Photo");
    }

    // ✅ clean payload (convert number fields)
    const payload = {
      title: form.title,
      city: form.city,
      price: Number(form.price),
      photo: form.photo,
      distance: form.distance ? Number(form.distance) : 0,
      maxGroupSize: form.maxGroupSize ? Number(form.maxGroupSize) : 1,
    };

    try {
      if (editId) {
        await api.put(`/tours/${editId}`, payload);
        alert("Tour updated ✅");
      } else {
        await api.post("/tours", payload);
        alert("Tour added ✅");
      }

      setForm(EMPTY_FORM);
      setEditId(null);
      getTours();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  // delete
  const deleteTour = async (id) => {
    if (!id) return alert("Tour id missing");
    if (!window.confirm("Delete this tour?")) return;

    try {
      await api.delete(`/tours/${id}`);
      alert("Deleted ✅");
      getTours();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // edit
  const editTour = (tour) => {
    // ✅ DO NOT setForm(tour) directly (it may include _id, reviews, etc.)
    setForm({
      title: tour.title || "",
      city: tour.city || "",
      price: tour.price ?? "",
      photo: tour.photo || "",
      distance: tour.distance ?? "",
      maxGroupSize: tour.maxGroupSize ?? "",
    });

    setEditId(tour._id); // ✅ must be _id
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <section className="manage_section">
      <Container>
        <h2 className="text-center mb-5">
          <i className="ri-map-pin-line"></i> Manage Tours
        </h2>

        {/* FORM CARD */}
        <Card className="p-4 shadow-lg border-0">
          <CardBody>
            <Row className="g-3">
              <Col md="3">
                <input
                  className="form-control"
                  placeholder="Tour Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Col>

              <Col md="2">
                <input
                  className="form-control"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </Col>

              <Col md="2">
                <input
                  className="form-control"
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </Col>

              <Col md="3">
                <input
                  className="form-control"
                  placeholder="Image URL"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                />
              </Col>

              {/* ✅ NEW FIELDS */}
              <Col md="2">
                <input
                  className="form-control"
                  placeholder="Distance (km)"
                  type="number"
                  value={form.distance}
                  onChange={(e) => setForm({ ...form, distance: e.target.value })}
                />
              </Col>

              <Col md="2">
                <input
                  className="form-control"
                  placeholder="Max People"
                  type="number"
                  value={form.maxGroupSize}
                  onChange={(e) =>
                    setForm({ ...form, maxGroupSize: e.target.value })
                  }
                />
              </Col>

              <Col md="2">
                <Button color="success" className="w-100" onClick={submitTour}>
                  {editId ? "Update" : "Add"} Tour
                </Button>
              </Col>

              {editId && (
                <Col md="2">
                  <Button color="secondary" className="w-100" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>

        {/* TOUR CARDS */}
        <Row className="mt-5">
          {tours.map((t) => (
            <Col lg="3" md="4" sm="6" key={t._id} className="mb-4">
              <Card className="tour_admin_card">
                {/* IMAGE */}
                <div className="admin_img">
                  <img src={t.photo} alt="tour" />
                </div>

                <CardBody>
                  <h5 className="fw-bold">{t.title}</h5>

                  <p className="text-muted mb-1">
                    <i className="ri-map-pin-line"></i> {t.city}
                  </p>

                  <p className="text-muted mb-1">
                    <i className="ri-road-map-line"></i> {t.distance || 0} km
                  </p>

                  <p className="text-muted mb-2">
                    <i className="ri-group-line"></i> {t.maxGroupSize || 1} people
                  </p>

                  <h6 className="text-success fw-bold">${t.price}</h6>

                  <div className="d-flex gap-2 mt-3">
                    <Button color="warning" size="sm" onClick={() => editTour(t)}>
                      <i className="ri-edit-line"></i> Edit
                    </Button>

                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deleteTour(t._id)}
                    >
                      <i className="ri-delete-bin-6-line"></i> Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}