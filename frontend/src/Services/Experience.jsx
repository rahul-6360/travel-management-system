import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./experience.css";

import experienceImg from "../assets/images/experience.png"; // agar naam different hai to rename karo
// or: import experienceImg from "../assets/images/hero-img01.jpg";

const Experience = () => {
  return (
    <section className="experience">
      <Container>
        <Row className="align-items-center">
          {/* LEFT */}
          <Col lg="6">
            <div className="experience__content">
              <span className="experience__badge">Experience</span>

              <h2>
                With our all experience <br /> we will serve you
              </h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quas aliquam, hic tempora inventore suscipit unde.
              </p>

              <div className="experience__counters">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful trip</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>

                <div className="counter__box">
                  <span>15+</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg="6">
            <div className="experience__imgWrap">
              <div className="experience__circle"></div>

              <img
                src={experienceImg}
                alt="experience"
                className="experience__img"
              />

              {/* small floating card (optional) */}
              <div className="experience__floatCard">
                <h6>Mountain Hiking</h6>
                <p>See details • Join Now</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;