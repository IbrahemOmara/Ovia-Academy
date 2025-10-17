import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="content-section">
      <section className="contact-section py-5">
        <Container>
          <h2 className="section-title my-fw-bolder text-main mb-4 text-center">
            Contact Us
          </h2>
          <p className="text-center mb-5 text-muted mx-auto">
            Have a question or need help? Our support team is available 24/7.
          </p>
          <Row className="g-5">
            <Col md={6}>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="message" className="mb-4">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your message..."
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100  ">
                  Send Message
                </Button>
              </Form>
            </Col>

            <Col md={6}>
              <div className=" contact-info ">
                <h5 className="my-fw-bold text-main-2 mb-3">Get in Touch</h5>
                <p>
                  <strong>Email:</strong> support@Ovia
                </p>
                <p>
                  <strong>Phone:</strong> +20 123 456 789
                </p>
                <p>
                  <strong>Support Hours:</strong> 25/9
                </p>
                <p className="text-muted small">
                  We’re here to answer your questions, solve problems, and make
                  sure you’re supported every step of your journey.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
