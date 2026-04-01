import React from "react";
import { Container } from "reactstrap";
import "./gallery.css";

import img1 from "../assets/images/gallery-01.jpg";
import img2 from "../assets/images/gallery-02.jpg";
import img3 from "../assets/images/gallery-03.jpg";
import img4 from "../assets/images/gallery-04.jpg";
import img5 from "../assets/images/gallery-05.jpg";
import img6 from "../assets/images/gallery-06.jpg";
import img7 from "../assets/images/gallery-07.jpg";
import img8 from "../assets/images/gallery-04.jpg";

const Gallery = () => {
  return (
    <section className="gallery_section">
      <Container>
        <h2 className="gallery_title">Visit our customers tour gallery</h2>

        <div className="masonry_gallery">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
          <img src={img5} alt="" />
          <img src={img6} alt="" />
          <img src={img7} alt="" />
          <img src={img4} alt="" />
        </div>
      </Container>
    </section>
  );
};

export default Gallery;