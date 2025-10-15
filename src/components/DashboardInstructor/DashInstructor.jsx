import React from "react";

export default function DashInstructor() {
  return (
    <>
      <section className="dash-instructor mt-3">
        <div className="container-fluid">
          <div className="row gy-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#FFEEE8" }}
                  >
                    <i className="fa-regular fa-circle-play text-warning-emphasis fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Enrolled Courses
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#EBEBFF" }}
                  >
                    <i className="fa-regular fa-square-check text-info fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Active Courses
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#FFEEE8" }}
                  >
                    <i className="fa-regular fa-circle-play text-warning fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Course Instructors
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#E1F7E3" }}
                  >
                    <i className="fa-solid fa-trophy text-success fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Completed Courses
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#FFF0F0" }}
                  >
                    <i className="fa-regular fa-circle-user text-danger fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Students
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#E1F7E3" }}
                  >
                    <i className="fa-regular fa-file-audio text-success fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Online Courses
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#F5F7FA" }}
                  >
                    <i className="fa-solid fa-wallet  text-primary-emphasis fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      USD Total Earning
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div
                className="card bg-body shadow-light"
                style={{ height: "fit-content" }}
              >
                <div className="card-body d-flex">
                  <div
                    className="icon-inst p-3 px-4"
                    style={{ backgroundColor: "#EBEBFF" }}
                  >
                    <i className="fa-solid fa-solar-panel text-primary fs-2"></i>
                  </div>
                  <div className="ms-3">
                    <h4 className="card-text my-fw-bold">0</h4>
                    <h6 className="card-title my-fw-bold text-muted">
                      Course Sold
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
