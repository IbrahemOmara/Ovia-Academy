import React from "react";
import "./MyCourses.css";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import tradingImg from "../../../assets/images/dashboard/tradingImg.jpg";

export default function MyCourses() {
  const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;
  const role = JSON.parse(localStorage.dataAuth).role;

  const getCourse = (id) => {
    return axios.get(`${baseURL}/Courses/GetMyCoruses?UserId=${id}`);
  };

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery("courses", () => getCourse(userId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  console.log(courses, error);

  if (isLoading) return <Loading />;

  return error ? (
    <h1 className=" text-center my-fw-bold mt-5">
      {error.response.data}
    </h1>
  ) : (
    <section className="courses mt-5">
      <div className="container-fluid">
        <div className="row gy-4 justify-content-center">
            {courses?.data.map((course) => {
              return (
                <div className="col-md-6"  key={course.id}>
                  <Link
                    className="d-block w-100"
                    to={`${
                      role === "Instructor"
                        ? "/dashboard-instructor"
                        : "/dashboard-user"
                    }/my-courses/view-course/${course.id}/${course.name}`}
                  
                  >
                    <div className="course-desc rounded">
                      <div className="head-course d-flex justify-content-between position-absolute w-100 p-2">
                        <span className="num-hours bg-grdient p-1 rounded">
                          {course.totalHouers} h
                        </span>
                        <span className="price bg-grdient p-1 rounded">
                          ${course.price}
                        </span>
                      </div>
                      <div className="title-desc-course bg-grdient opacity-75 flex flex-column justify-content-center">
                        <p className="text-desc text-center">{course.desc}</p>
                      </div>
                      <div className="main-title">
                        <h6> {course.name}</h6>
                      </div>
                      <div
                        style={{ width: "100%", height: "350px" }}
                        className="img-course overflow-hidden"
                      >
                        <img src={tradingImg} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
