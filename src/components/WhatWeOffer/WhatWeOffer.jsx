import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiTrendingUp, FiUsers, FiAward } from "react-icons/fi";
import { FaChalkboardTeacher, FaVideo } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import "./WhatWeOffer.css";
import icon1 from  '../../assets/Gif/advertising.gif'
import icon2 from  '../../assets/Gif/artificial-intelligence.gif'
import icon3 from  '../../assets/Gif/trading.gif'
import icon4 from  '../../assets/Gif/business-plan.gif'
import icon5 from  '../../assets/Gif/content-creator.gif'
import icon6 from  '../../assets/Gif/online-shopping.gif'
import icon7 from  '../../assets/Gif/soft-skills.gif'
import icon8 from  '../../assets/Gif/graphic-designer.gif'

const items = [
  {
    title: " Digital Marketing Track",
    desc: "",
    icon: icon1,
  },
  {
    title: "Ai Track",
    desc: "",
    icon: icon2,
  },
  {
    title: "Trading Track",
    desc: "",
    icon: icon3,
  },
  {
    title: "Business & Entrepreneurship Track",
    desc: "",
    icon: icon4,
  },
  {
    title: "Content Creation Track",
    desc: "",
    icon: icon5,
  },
  {
    title: "Sales Track",
    desc: "",
    icon: icon6,
  },
  {
    title: "Soft Skills & Personal Development Track",
    desc: "",
    icon: icon7,
  },
  {
    title: "Graphic Design",
    desc: "",
    icon: icon8,
  },
];

const WhatWeOffer = () => (
  <section className="offer-section py-5">
    <Container>
      <h2 className="section-title text-center mb-5">
        Structured learning paths
      </h2>

      <h4 className="lead mt-3 text-center">
        Our library of courses caters to all skill levels,skill levels from
        beginner to advanced,
      </h4>
      <p className="lead mt-3 text-center">
        providing a structured path to ensure a strong foundation before
        tackling complex topics.
      </p>
      <Row className="g-4">
        {items.map((item, index) => (
          <Col md={3} key={index}>
            <div className="offer-card   p-4 text-center">
              <img  src={item.icon} alt="gif"></img>
              <h5 className="offer-title mb-2">{item.title}</h5>
              <p className="offer-desc">{item.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default WhatWeOffer;
