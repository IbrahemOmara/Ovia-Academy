import React from "react";
import "./Footer.css";
import logo from "../../assets/Ovia-logo/Ovia.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="row gy-5 align-items-start">
            <div className="col-md-6 col-lg-4 text-center text-md-start">
              <Link to="/">
                <div className="logo mb-3 m-md-0">
                  <img src={logo} alt="Incomes Logo" className="img-fluid" />
                </div>
              </Link>
              <ul className="links-social list-unstyled d-flex justify-content-center justify-content-md-start gap-3 mt-3">
                <li>
                  <Link to="https://www.facebook.com" target="_blank">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.tiktok.com" target="_blank">
                    <i className="fab fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.instagram.com" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.youtube.com" target="_blank">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-4 text-center text-md-start">
              <div className="our-services">
                <h3>Our Services</h3>
                <ul className="list-unstyled d-flex flex-column gap-2 mt-4">
                  <li>Live training</li>
                  <li>online Course</li>

                  <li>Chat Support</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 text-center text-md-start">
              <div className="our-services">
                <h3>Contacts</h3>
                <ul className="list-unstyled d-flex flex-column gap-2 mt-4">
                  <li>
                    <i className="fa-solid fa-phone me-2"></i> +2010
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope me-2"></i>{" "}
                    supports@Ovia.com
                  </li>
                  <li>
                    <i className="fa-solid fa-globe me-2"></i>{" "}
                    www.ovia.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}
