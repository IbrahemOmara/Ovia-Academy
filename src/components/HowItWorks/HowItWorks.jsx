import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FiUserPlus,
  FiCompass,
  FiBookOpen,
  FiDollarSign,
} from "react-icons/fi";
import "./HowItWorks.css";
import icon1 from '../../assets/Gif/icon/best-practice.png'
import icon2 from '../../assets/Gif/icon/expert.png'
import icon3 from '../../assets/Gif/icon/learning.png'
import icon4 from '../../assets/Gif/icon/solidarity.png'

const steps = [
  {
    title: "Empowering Education",
    description: "",
    icon: icon3,
  },
  {
    title: "Expert Guidance",
    description: "",
    icon: icon2,
  },
  {
    title: "Practical Skills",
    description: "",
    icon: icon1,
  },
  {
    title: "Supportive Community",
    description: "",
    icon: icon4,
  },
];

const HowItWorks = () => (
  <section className="how-it-works-section py-5">
    <Container>
      <h2 className="section-title-head text-center mb-5 ">
        Why Choose Ovia ?
      </h2>
      <Row className="g-4">
        {steps.map((step, i) => (
          <Col md={3} sm={6} xs={12} key={i}>
            <div className="how-card text-center p-4 h-100 shadow-sm">
              <img src={step.icon} alt="icon image"></img>
              <h5 className="how-title fw-bold">{step.title}</h5>
              <p className="how-desc text-muted">{step.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default HowItWorks;
