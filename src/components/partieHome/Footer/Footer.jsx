import React from "react";
import "./Footer.css";
//import { Button } from "../../Components/Button";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

function Footer() {
  return (
    <div className="footer-container" style={{ marginTop: "" }}>
      <div className="footer-links">
       
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              Donation de sang
            </Link>
          </div>
          
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
              style={{ color: "white" }}
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
              style={{ color: "white" }}
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
              style={{ color: "white" }}
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
              style={{ color: "white" }}
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
              style={{ color: "white" }}
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
