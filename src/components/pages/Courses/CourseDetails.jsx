import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // هنا بنعمل Scroll لفوق لما المكون يحمل
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // استلام بيانات الكورس من state اللي جاي من صفحة الكورسات
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="py-5 text-center">
        <h3>Course data not found.</h3>
        <Button variant="primary" onClick={() => navigate(-1)}>
          ⬅ Back
        </Button>
      </div>
    );
  }

  return (
    <div className="content-course">
      <div className="container py-5">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          ⬅ Back to Courses
        </Button>

        <Card className="shadow p-4">
          <Card.Img
            variant="top"
            src={
              course.photos ||
              "https://images.pexels.com/photos/7092350/pexels-photo-7092350.jpeg"
            }
            alt={course.name}
            className="mb-3 rounded custom-course-image"
          />
          <Card.Body>
            <Card.Title className="fs-3 mb-3">{course.name}</Card.Title>
            <Card.Text style={{ whiteSpace: "pre-line" }}>
              {course.fullDesc || course.desc || "No description available."}
            </Card.Text>

            <ul className="list-unstyled mb-3">
              <li>
                <strong>Instructor:</strong>{" "}
                {course.instractorName
                  ? course.instractorName.join(", ")
                  : "N/A"}
              </li>
              <li>
                <strong>Videos:</strong> {course.noOfVideos || 0}
              </li>
              <li>
                <strong>Hours:</strong> {course.totalHouers || 0}
              </li>
              <li>
                <strong>Category:</strong> {course.category?.name || "N/A"}
              </li>
              <li>
                <strong>Price:</strong>{" "}
                {course.oldPrice && (
                  <span className="text-decoration-line-through text-muted me-2">
                    {course.oldPrice} EGP
                  </span>
                )}
                <span className="fw-bold text-success">{course.price} EGP</span>
              </li>
            </ul>

            {/* لو عندك دروس تقدر تعرضهم هنا */}
            {course.sectionCourseD && course.sectionCourseD.length > 0 ? (
              <>
                <h5>Course Lessons</h5>
                {course.sectionCourseD.map((section, idx) => (
                  <div key={idx} className="card mb-2 p-3 shadow-sm">
                    <h6>
                      {section.title ||
                        section.sectionTitle ||
                        `Lesson ${idx + 1}`}
                    </h6>
                    <p>{section.description || "No description."}</p>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-muted">
                No lessons available for this course.
              </p>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
