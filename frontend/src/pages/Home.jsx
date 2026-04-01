import React, { useState } from "react";
import "../style/home.css";
import { Container, Row, Col } from "reactstrap";

import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";

import Subtitle from "../shared/subtitle";
import SearchBar from "../shared/SearchBar";

import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import Experience from "../Services/Experience";
import Gallery from "../Services/Gallery";
import Testimonial from "../Services/Testimonial";
import Newsletter from "../Services/Newsletter";

function Home() {
  //  filters state
  const [filters, setFilters] = useState({
    city: "",
    distance: "",
    maxPeople: "",
  });

  //  SearchBar se filters yaha aayenge
  const handleSearch = (data) => {
    setFilters({
      city: data.city || "",
      distance: data.distance || "",
      maxPeople: data.maxPeople || "",
    });
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center gap-2">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="world" width="40" />
                </div>

                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>

                <p>
                  Explore the world with us. Discover amazing places, book
                  affordable packages and create unforgettable memories with
                  your friends and family.
                </p>
              </div>
            </Col>

            <Col lg="6">
              <div className="hero_images d-flex gap-3 justify-content-center">
                <div className="img_box">
                  <img src={heroImg} alt="hero1" className="w-100" />
                </div>

                <div className="img_box mt-4">
                  <img src={heroImg02} alt="hero2" className="w-100" />
                </div>

                <div className="video_box">
                  <video src={heroVideo} controls muted className="w-100"></video>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mt-5">
              {/*  yaha change: onSearch={handleSearch} */}
              <SearchBar onSearch={handleSearch} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== FEATURED TOUR ===== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4">
              <h2 className="featured_tour-title">Our Featured Tours</h2>
            </Col>

            {/* filters pass */}
            <FeaturedTourList filters={filters} />
          </Row>
        </Container>
      </section>

      {/* ===== OTHER SECTIONS ===== */}
      <Experience />
      <Gallery />
      <Testimonial />
      <Newsletter />
    </>
  );
}

export default Home;