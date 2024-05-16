import React, { Component } from "react";

import Slideimage from "../SlideImage/Slideimage";
import "./Home.css";
import Footer from "../Footer/Footer";

import Pricing from "../Pricing/Pricing";

import Contact from "../Contact/Contact";
import Navbar from "../Navbar/Navbar";
//import "./index.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home6">
        <Slideimage />
      </div>
      
      <Pricing />
      
      <Contact />

      <Footer />
    </>
  );
}
