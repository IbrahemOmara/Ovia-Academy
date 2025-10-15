// 📁 src/components/home/HeroSection.jsx
import React from "react";
import { Container } from "react-bootstrap";
import "./HeroSection.css";
const HeroSection = () => (
  <section className="hero-section py-5 text-center text-white">
    <Container>
      <h1 className="display-5 fw-bold">Online Courses </h1>
      <p className="lead mt-3">
        for Professional Growth
      </p>
      <p>
        Find the perfect courses and unlock your personal progress.
      </p>
    </Container>
  </section>
);

export default HeroSection;
