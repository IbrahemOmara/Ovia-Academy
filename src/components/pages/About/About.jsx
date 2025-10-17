import React, { useState, useEffect } from "react"; // استورد useEffect
import "./AboutUs.css";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";

export default function About() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // // تخلي الصفحة تظهر من الاعلي
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/Courses/GetAllCourses?showInHomePage=true&limit=12&page=1`
        );

        const data = res.data;
        const coursesData = Array.isArray(data) ? data : data.courses || [];
        setCourses(coursesData);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const team = [
    {
      name: "Ahmed Elsayed",
      role: "Trainer",
      img: "https://images.pexels.com/photos/702139/pexels-photo-702139.jpeg",
    },
    {
      name: "Mona Adel",
      role: "Marketing Expert",
      img: "https://images.pexels.com/photos/702139/pexels-photo-702139.jpeg",
    },
    {
      name: "Khaled Hassan",
      role: "Content Creator",
      img: "https://images.pexels.com/photos/702139/pexels-photo-702139.jpeg",
    },
    {
      name: "Sara Youssef",
      role: "Support Lead",
      img: "https://images.pexels.com/photos/702139/pexels-photo-702139.jpeg",
    },
  ];

  const testimonials = [
    {
      name: "Omar Ali",
      feedback:
        "Ruwad V changed my career! The marketing course helped me land my first freelance job.",
    },
    {
      name: "Nour El-Din",
      feedback:
        "Highly recommend this platform for anyone looking to grow in the digital world.",
    },
  ];

  return (
    <div className="about-all">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="about-us-page bg-light"
      >
        {/* Hero Section */}
        <section className="hero-section text-center py-5 text-white bg-dark">
          <Container>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="display-5 fw-bold"
            >
              Empowering Your Professional Future
            </motion.h1>
            <p className="lead">Discover the Power of Education with Ovia Academy</p>
          </Container>
        </section>

        {/* About */}
        <section className="py-5">
          <Container>
            <Row className="mb-4">
              <Col>
                <h2 className="text-center fw-bold">About Ovia </h2>
                <p className="text-muted text-center mx-auto w-75">
                  Ruwad V Academy is your go-to E-Learning hub for everything
                  related to online business. We train freelancers and empower
                  youth to market and sell effectively.
                </p>
              </Col>
            </Row>

            {/* Vision & Mission */}
            <Row >
              {[
                {
                  title: "Our Vision",
                  content:
                    "To be the trusted partner in delivering excellent and reliable e-learning across the Middle East.",
                },
                {
                  title: "Our Mission",
                  content:
                    "To bridge the gap between academia and market demands, enabling individuals to achieve dignified, profitable careers.",
                },
              ].map((item, idx) => (
                <Col md={6} className="mb-4" key={idx}>
                  <Card className="shadow h-100">
                    <Card.Body>
                      <h4 className="text-primary fw-semibold">{item.title}</h4>
                      <p>{item.content}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Core Values */}
            <Row className="mt-4">
              <Col>
                <h3 className="mb-3 fw-semibold">Our Core Values</h3>
                <ul className="list-group list-group-flush">
                  {[
                    [
                      "Empowerment",
                      "We equip students with tools to control their futures.",
                    ],
                    ["Integrity", "We ensure transparency and honesty."],
                    ["Excellence", "High-quality, expert-led courses."],
                    ["Innovation", "Latest tools for better experience."],
                  ].map(([key, value], idx) => (
                    <li className="list-group-item" key={idx}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>

            {/* Courses Overview */}
            <Row className="mt-5" id="our-courses">
              <div className="my-4 course-none">
                <h3 className="text-center fw-bold mb-3">Our Courses</h3>
                <p className="text-muted text-center w-75 mx-auto">
                  Explore a variety of professional courses designed to help you
                  succeed in the digital world.
                </p>
              </div>

              {loading && <p className="text-center">Loading courses...</p>}
              {error && <p className="text-center text-danger">{error}</p>}

              {!loading && !error && courses.length === 0 && (
                <p className="text-center">No courses found.</p>
              )}

              {!loading &&
                !error &&
                courses.map((course, idx) => (
                  <Col key={idx} md={6} lg={3} className="mb-4">
                    <Card className="h-100 shadow-sm course-card">
                      <Card.Img
                        variant="top"
                        src={
                          course.photos ||
                          "https://images.pexels.com/photos/7092350/pexels-photo-7092350.jpeg"
                        }
                        alt={course.name || course.title}
                      />
                      <Card.Body>
                        <h5 className="fw-bold">
                          {course.name || course.title}
                        </h5>
                        <p className="text-muted">
                          {course.category?.name || course.category}
                        </p>
                        <div className="text-end">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              navigate(`/courses/${course.id}`, {
                                state: { course },
                              })
                            }
                          >
                            More Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>

            <Row className="text-center my-4">
              <Col>
                <Link to="/courses">
                  <button className="btn btn-primary rounded-pill px-4">
                    View All Courses
                  </button>
                </Link>
              </Col>
            </Row>

            {/* Why Learn Online Business */}
            <Row className="mt-5">
              <Col>
                <h3 className="text-center">Why Learn Online Business?</h3>
                <ul className="mt-3 list-unstyled fs-6">
                  {[FaGlobe, FaUsers, FaClock, FaMoneyBillWave].map(
                    (Icon, idx) => (
                      <li key={idx} className="mb-2">
                        <Icon className="text-primary me-2" />
                        <strong>
                          {
                            [
                              "Global Reach",
                              "Diverse Opportunities",
                              "Flexibility",
                              "Scalability & ruwadvision",
                            ][idx]
                          }
                          :
                        </strong>{" "}
                        {
                          [
                            " Expand your audience.",
                            " E-commerce, freelancing, affiliate marketing.",
                            " Learn on your own schedule.",
                            " Earn in foreign currency with less capital.",
                          ][idx]
                        }
                      </li>
                    )
                  )}
                </ul>
              </Col>
            </Row>

            {/* Team */}
            <Row className="mt-5">
              <Col>
                <h3 className="text-center">Meet Our Team</h3>
                <p className="text-muted text-center">
                  Meet the people driving your success.
                </p>
              </Col>
            </Row>
            <Row className="text-center">
              {team.map((member, idx) => (
                <Col md={6} lg={3} key={idx} className="mb-4">
                  <Card className="shadow-sm team-card h-100">
                    <Card.Img
                      variant="top"
                      src={member.img}
                      alt={member.name}
                    />
                    <Card.Body>
                      <h5>{member.name}</h5>
                      <p className="text-muted">{member.role}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Testimonials */}
            <Row className="mt-5">
              <Col>
                <h3 className="text-center">What Our Students Say</h3>
              </Col>
            </Row>
            <Row className="mt-3">
              {testimonials.map((t, idx) => (
                <Col md={6} key={idx} className="mb-3">
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <p>"{t.feedback}"</p>
                      <h6 className="text-end text-primary">— {t.name}</h6>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* FAQ */}
            <Row className="mt-5">
              <Col>
                <h3 className="text-center">Frequently Asked Questions</h3>
                <Accordion defaultActiveKey="0" className="my-3">
                  {[
                    [
                      "How do I enroll in a course?",
                      "Select a course, click 'Enroll', and follow the steps. You may need to create an account first.",
                    ],
                    [
                      "Do I receive a certificate?",
                      "Yes, upon successfully completing the course and passing the final test.",
                    ],
                    [
                      "Are the courses beginner-friendly?",
                      "Absolutely! Our courses are structured to support all levels — from beginners to advanced learners.",
                    ],
                  ].map(([q, a], idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={idx}>
                      <Accordion.Header>{q}</Accordion.Header>
                      <Accordion.Body>{a}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>

            {/* Data Collection Form */}
            <Row className="mt-5" id="data-collection">
              <Col md={{ span: 8, offset: 2 }}>
                <Card className="shadow-lg p-4 bg-white rounded-4">
                  <h3 className="text-center mb-3 fw-bold text-primary">
                    Stay Updated With Us
                  </h3>
                  <p className="text-center text-muted mb-4">
                    Join our community to receive exclusive updates, free
                    resources, and course announcements.
                  </p>
                  <form>
                    <Row className="mb-3">
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <select className="form-select" required>
                          <option value="">Select Area of Interest</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="design">Graphic Design</option>
                          <option value="freelancing">Freelancing</option>
                          <option value="tot">Training of Trainers</option>
                        </select>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 py-2 rounded-pill"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </form>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </motion.div>
    </div>
  );
}
