import React from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";

const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",   // change here
    display: "Tours",
  },
  {
    path: "/my-bookings",
    display: "My Booking",
  },

   {
    path: "/manage-tours",
    display: "Dashboard",
  },

   {
    path: "/profile",
    display: "User",
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  //  About scroll function
  const handleAboutClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/" && location.pathname !== "/home") {
      navigate("/home");

      setTimeout(() => {
        const section = document.getElementById("about");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
      const section = document.getElementById("about");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">

            {/* ===== logo ===== */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            {/* ===== menu ===== */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>

                    {/*  About scroll */}
                    {item.path === "#about" ? (
                      <a href="#about" onClick={handleAboutClick}>
                        {item.display}
                      </a>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active_link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== right buttons ===== */}
            <div className="nav_right d-flex align-items-center gap-3 ms-3">
              <div className="nav_btns d-flex align-items-center gap-3">
                <Button className="btn secondary_btn">
                  <Link to="/login">Login</Link>
                </Button>

                <Button className="btn primary_btn">
                  <Link to="/register">Register</Link>
                </Button>
              </div>

              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;