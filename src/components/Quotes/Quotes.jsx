// 📁 src/components/home/Quotes.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Quotes.css"; // استورد الستايلات
import userIcon from '../../assets/Gif/icon/man.png'


const quotes = [
  {
    quote: "Innovation drives progress — empower yourself to lead the change.",
    author: "— Founder, Ovia ",
    icon: userIcon,
  },
  {
    quote:
      "True success is crafted through discipline, strategy, and persistence.",
    author: "— IN Mentorship Team",
    icon: userIcon,
  },
  {
    quote: "Building sustainable wealth requires a proven system, not luck.",
    author: "— Digital Business Insight",
    icon: userIcon,
  },
];

const Quotes = () => (
  <section className="quotes-section bg-main-color py-5">
    <Container>
      <h2 className="section-title ">Real Stories , Real Results 
        What Our Customers Say </h2>
      <Row className="g-4">
        {quotes.map((item, i) => (
          <Col md={4} sm={6} key={i}>
            <div className="quote-card text-white p-4 h-100 my-shadow rounded-4">
              <img src={item.icon} alt="user icon"></img>
              <div className="quote-mark text-main fs-1">“</div>
              <p className="quote-text my-fw-bold fs-5">{item.quote}</p>
              <footer className="quote-author text-secondary mt-3">
                {item.author}
              </footer>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Quotes;
