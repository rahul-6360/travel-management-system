import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { api } from "../utils/api";
import "../style/tours-page.css";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // search
  const [query, setQuery] = useState("");

  // edit modal state
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // edit form state
  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    photo: "",
    featured: false,
    desc: "",
  });

  // add form state
  const [addForm, setAddForm] = useState({
    title: "",
    city: "",
    price: "",
    photo: "",
    featured: false,
    desc: "",
  });

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tours");
      setTours(res.data || []);
    } catch (e) {
      console.log(e);
      alert("Tours fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return tours;
    return tours.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const city = (t.city || "").toLowerCase();
      return title.includes(q) || city.includes(q);
    });
  }, [tours, query]);

  const openEdit = (tour) => {
    setEditId(tour._id);
    setForm({
      title: tour.title || "",
      city: tour.city || "",
      price: tour.price ?? "",
      photo: tour.photo || "",
      featured: !!tour.featured,
      desc: tour.desc || "",
    });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const addTour = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tours", { ...addForm, price: Number(addForm.price) });
      alert("Tour added Successfully");
      setAddForm({
        title: "",
        city: "",
        price: "",
        photo: "",
        featured: false,
        desc: "",
      });
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || "Add failed");
    }
  };

  const updateTour = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tours/${editId}`, {
        ...form,
        price: Number(form.price),
      });
      alert("Tour updated Successfully");
      closeModal();
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const deleteTour = async (id) => {
    const ok = window.confirm("Delete this tour?");
    if (!ok) return;

    try {
      await api.delete(`/tours/${id}`);
      alert("Deleted  Successfully");
      fetchTours();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="tours_page">
      <Container>
        <div className="tours_head">
          <h2>All Tours</h2>
        </div>

        {/* ADD + SEARCH */}
        <div className="top_tools">
          {/* Add Tour */}
          <form className="add_box" onSubmit={addTour}>
            <h4>Add New Tour</h4>

            <div className="grid_2">
              <input
                className="form-control"
                name="title"
                value={addForm.title}
                onChange={handleAddChange}
                placeholder="Title"
                required
              />
              <input
                className="form-control"
                name="city"
                value={addForm.city}
                onChange={handleAddChange}
                placeholder="City"
                required
              />
            </div>

            <div className="grid_2 mt-2">
              <input
                className="form-control"
                type="number"
                name="price"
                value={addForm.price}
                onChange={handleAddChange}
                placeholder="Price"
                required
              />
              <input
                className="form-control"
                name="photo"
                value={addForm.photo}
                onChange={handleAddChange}
                placeholder="Image URL"
                required
              />
            </div>

            <textarea
              className="form-control mt-2"
              rows="3"
              name="desc"
              value={addForm.desc}
              onChange={handleAddChange}
              placeholder="Description (optional)"
            />

            <div className="d-flex align-items-center gap-2 mt-2">
              <input
                id="featuredAdd"
                type="checkbox"
                name="featured"
                checked={addForm.featured}
                onChange={handleAddChange}
              />
              <label htmlFor="featuredAdd" className="m-0">
                Featured
              </label>
            </div>

            <button className="btn btn-success w-90 mt-3">Add Tour</button>
          </form>

          {/* Search */}
          <div className="search_box">
            <h4>Search Tours</h4>
            <input
              className="form-control"
              placeholder="Search by title or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <small className="text-muted">
              Showing: {filteredTours.length} tours
            </small>
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <div className="tours_loading">Loading...</div>
        ) : filteredTours.length === 0 ? (
          <div className="tours_empty">No tours found.</div>
        ) : (
          <Row>
            {filteredTours.map((t) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={t._id}>
                <div className="tour_card_ui">
                  <div className="tour_img_wrap">
                    <img src={t.photo} alt={t.title} />
                    {t.featured ? (
                      <span className="tour_badge">Featured</span>
                    ) : null}
                  </div>

                  <div className="tour_body">
                    <h5 className="tour_title_ui">{t.title}</h5>

                    <div className="tour_meta_ui">
                      <span>
                        <i className="ri-map-pin-line"></i> {t.city}
                      </span>
                      <b>${t.price}</b>
                    </div>

                    <div className="tour_actions ms-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openEdit(t)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTour(t._id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Edit Modal */}
        <Modal isOpen={open} toggle={closeModal} centered>
          <ModalHeader toggle={closeModal}>Edit Tour</ModalHeader>
          <ModalBody>
            <form onSubmit={updateTour}>
              <label className="form_label">Title</label>
              <input
                className="form-control mb-2"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <label className="form_label">City</label>
              <input
                className="form-control mb-2"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />

              <label className="form_label">Price</label>
              <input
                className="form-control mb-2"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />

              <label className="form_label">Photo URL</label>
              <input
                className="form-control mb-2"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                required
              />

              <label className="form_label">Description</label>
              <textarea
                className="form-control mb-2"
                rows="3"
                name="desc"
                value={form.desc}
                onChange={handleChange}
              />

              <div className="d-flex align-items-center gap-2 mb-3">
                <input
                  id="featured"
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured" className="m-0">
                  Featured
                </label>
              </div>

              <Button color="primary" className="w-100">
                Update Tour
              </Button>
            </form>
          </ModalBody>
        </Modal>
      </Container>
    </section>
  );
}