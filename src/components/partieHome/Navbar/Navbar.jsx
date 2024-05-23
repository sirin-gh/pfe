import React, { useState, useEffect } from "react"
//import { Button } from "./Button";
import { Link } from "react-router-dom"
import "./Navbar.css"
import logo from "../../../assets/images/logo1.png"

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  return (
    <React.Fragment>
      <nav className="navbar " style={{ position: "fixed" }}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" style={{}}>
            <img src={logo} style={{ width: "100px" }}></img>
            Donation de sang
          </Link>

          <div className="c">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Acceuil
                </Link>
              </li>

              <li className="nav-item">
                <a href="#pricing" className="nav-links">
                  Infos
                </a>
              </li>

              <li className="nav-item">
                <a href="#contact" className="nav-links">
                  Contacter-Nous
                </a>
              </li>

              {/* Boutons "Login" et "Sign in" */}
              <li className="nav-item nav-button-item">
                <button className="nav-button">
                  <Link to="/login" className="nav-links">
                    Login
                  </Link>
                </button>
              </li>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-label="Toggle navigation"
                style={{
                  border: "1px",

                  color: "whitesmoke",
                }}
              ></button>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar
