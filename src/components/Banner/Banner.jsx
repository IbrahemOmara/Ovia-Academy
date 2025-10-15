import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import icon1 from '../../assets/Gif/icon/online-education.gif'


const courseBanners = [
  {
    title: "Start Your Learning Journey",
    description:
      "Comprehensive programming and design courses led by top instructors.",
    image: "https://www.stjegypt.com/uploads/429857052955.jpg",
  },
  {
    title: "Certified Courses",
    description:
      "Earn internationally recognized certificates upon completion.",
    image: "https://images.pexels.com/photos/4443162/pexels-photo-4443162.jpeg",
  },
  {
    title: "Learn Anytime, Anywhere",
    description:
      "Flexible online courses available 24/7 to suit your schedule.",
    image: "https://images.pexels.com/photos/7092350/pexels-photo-7092350.jpeg",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const duration = 5000; // 5 ثواني

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courseBanners.length);
      setProgress(0); // اعادة ضبط البروجريس بار
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, duration / 50); // يزيد تدريجيًا

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="content-banner">
      <div className="main-banner">
        {courseBanners.map((banner, idx) => (
          <div
            key={idx}
            className={`banner-slide ${
              idx === currentSlide ? "active" : "d-none"
            }`}
            
          >
            <div className="banner-content text-white">
              <h2 className="banner-heading">{banner.title}</h2>
              <p className="banner-text">{banner.description}</p>
              <Link to="/courses" className="btn banner-btn mt-3">
                Start Now
              </Link>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${idx === currentSlide ? progress : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="main-banner-2">
        <img src={icon1} alt="" srcset="" />
      </div>
    </div>
  );
};

export default Banner;
