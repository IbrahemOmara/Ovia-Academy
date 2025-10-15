import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CallToAction.css";

const CallToAction = () => (
  <section className="cta-section py-5 text-center text-white bg-root">
    <Container>
      <h2 className="cta-title my-fw-bolder mb-3">
        
      Don't Wait,
      Invest in Your Future
      Start Your Journey with OviaToday!
      </h2>
      <p className="cta-subtitle fs-5 my-fw-bold mb-4">
        Gain real-world skills in
        <span className="text-main"> trading</span>,
        <span className="text-main"> marketing</span>, and
        <span className="text-main"> design</span> — guided by top experts.
      </p>

      <Link to="/courses">
        <Button className="px-5 py-2 banner-btn">Explore Courses</Button>
      </Link>
    </Container>
  </section>
);

export default CallToAction;
