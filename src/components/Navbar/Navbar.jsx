import React from "react";
import "./Navbar.css";
import logo from "../../assets/Ovia-logo/Ovia.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  let dataAuth;
  const navigate = useNavigate();
  localStorage.dataAuth
    ? (dataAuth = JSON.parse(localStorage.dataAuth))
    : (dataAuth = null);
  // console.log(dataAuth);

  const logOut = () => {
    localStorage.clear();
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top shadow ">
        <div className="container p-0 d-flex justify-content-between align-items-center">
          <NavLink className="navbar-brand" to="/">
            <div className="logo">
              <img className="w-100" src={logo} alt="" srcSet="" />
            </div>
          </NavLink>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="fa-solid fa-bars text-sin "></i>
          </button>

          <div
            className="offcanvas offcanvas-start bg-light-color"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn btn-close text-main"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <i className="fa-solid fa-close fs-3 text-white"></i>
              </button>
            </div>
            <div className="offcanvas-body py-2 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3 w-100">
              <ul className="navbar-nav mt-2 m-lg-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <NavLink className="nav-link" aria-current="page" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/courses">
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about-us">
                    About US
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact-us">
                    Contact US
                  </NavLink>
                </li>
              </ul>
              {dataAuth ? (
                dataAuth.role === "Active" ? (
                  <div className="nav-item d-flex align-items-center">
                    <Link
                      className="text-white link-dashboard"
                      to="/dashboard-user"
                    >
                      <i className="fa-solid fa-table-columns"></i>
                      <span className="">Dashboard</span>
                    </Link>
                  </div>
                ) : dataAuth.role === "Instructor" ? (
                  <div className="nav-item d-flex align-items-center">
                    <Link
                      className="text-white link-dashboard"
                      to="/dashboard-instructor"
                    >
                      <i className="fa-solid fa-table-columns"></i>
                      <span className="">Dashboard</span>
                    </Link>
                  </div>
                ) : (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-grdient"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      My List
                    </button>
                    <ul className="dropdown-menu bg-main-color shadow ">
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="packages"
                        >
                          Packages
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="requestToken"
                        >
                          Request Token
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to="live-trading-nns"
                        >
                          Live Trading
                        </Link>
                      </li>
                    </ul>
                  </div>
                )
              ) : (
                <ul className="navbar-nav gap-3 m-3 mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="btn-signIn nav-link"
                      aria-current="page"
                      to="/sign-in"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn-signUp nav-link" to="/sign-up">
                      Sign up
                    </Link>
                  </li>
                </ul>
              )}

              {dataAuth?.token.token?.length > 0 ? (
                <ul className="navbar-nav">
                  <li className="nav-item p-0">
                    <button
                      onClick={logOut}
                      className="btn text-white link-dashboard p-0 mt-2 ms-3 fa-rotate-180"
                      to="/sign-in"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399c-.277.277-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26c-.602-.602-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68z"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
