import React, { useEffect, useState } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import coursePic from "../../../assets/cources/digitalMarkting.jpeg"
import { baseURL } from "../../../utils/baseURL";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center mb-5 mt-5 text-white">Featured Courses</h2>
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-sm-6 col-md-4 col-lg-4">
            <Card className="course-card">
              <Card.Img
                variant="top"
                src={
                  course.photos ||
                  coursePic
                }
                className="mb-3 rounded course-card-img"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className=" mb-2" style={{textAlign:"center"}}>{course.name}</Card.Title>
                <Card.Text className="text-muted small mb-2">
                  {course.desc
                    ? course.desc.substring(0, 60) + "..."
                    : "No description."}
                </Card.Text>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div>
                    <span> Price:</span>{" "}
                    {course.oldPrice && (
                      <span className="text-decoration-line-through text-muted me-2 ">
                        {course.oldPrice} EGP
                      </span>
                    )}
                    <span className="fw-bold text-success price">
                      {course.price} EGP
                    </span>
                  </div>
                  <Button
                    className="course-details-btn"
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      navigate(`/courses/${course.id}`, { state: { course } })
                    }
                  >
                    More Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
