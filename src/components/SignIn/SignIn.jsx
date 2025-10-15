import React, { useEffect, useState } from "react";
import bg from "../../assets/images/sign-up/bgSingUp.png";
import "../SignUp/SignUp.css";
import logo from "../../assets/images/logo.png";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/baseURL";
import BtnLoading from "../BtnLoading/BtnLoading";
//
export default function SignIn() {
  const [iconView, setIconView] = useState("fa-eye-slash");
  const [togglePassword, setTogglePassword] = useState(true);
  const [type, setType] = useState("password");
  let navigate = useNavigate();
  const [showInvalid, setShowInvalid] = useState("d-none");
  const [invalid, setInvalid] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  function sendDataToApi(values) {
    setBtnLoading(true);
    axios
      .post(`${baseURL}/User/authenticate`, values)
      .then(({ data }) => {
        // console.log(data);
        localStorage.setItem("dataAuth", JSON.stringify(data));
        if (data.role === "Admin" || data.role === "Active") {
          navigate("/dashboard-user/main-dashboard");
        } else if (data.role === "Instructor") {
          navigate("/dashboard-instructor");
        } else if (data.role == "Inactive") {
          navigate("/packages");
        } else {
          navigate("/home");
        }
        setBtnLoading(false);
      })
      .catch((error) => {
        setBtnLoading(false);
        // console.log(error);
        setShowInvalid("d-block");
        setInvalid(error.response.data.message);
      });
  }

  let login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const valuesAuth = {
        username: values.email,
        password: values.password,
      };
      sendDataToApi(valuesAuth);
    },
  });

  const viewPassword = () => {
    if (togglePassword) {
      setIconView("fa-eye");
      setType("text");
      setTogglePassword(false);
    } else {
      setIconView("fa-eye-slash");
      setType("password");
      setTogglePassword(true);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      {/* class=  srcSet */}
      <section className="sign-in sign-up d-flex align-items-center justify-content-center">
        <div className="bg-sign-up">
          <img src={bg} className="w-100 h-100 object-fit-fill" />
        </div>
        <div className="container my-5">
          <div className="bg-form p-4">
            <div className="header-form me-3">
              <Link to="/">
                <div className="logo ms-auto">
                  <img className="w-100 h-100 " src={logo} alt="" srcSet="" />
                </div>
              </Link>
            </div>
            <div className="row mx-1 mt-4">
              <div className="col-md-6 col-lg-5 pe-3">
                <form onSubmit={login.handleSubmit} className="">
                  <p className="fs-3 fw-bold text-title">
                    Get Your Success, Learn, Earn, Acquire
                  </p>
                  <h2 className="fw-bolder text-sin ">Welcome Back</h2>
                  <div className="row mt-4 flex-column">
                    <div className="col-md-10">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          onChange={login.handleChange}
                          name="email"
                          type="email"
                          className="form-control"
                          id="email"
                        />
                        {login.errors.email && login.touched.email ? (
                          <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                            {login.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="mb-1">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="position-relative">
                          <input
                            onChange={login.handleChange}
                            name="password"
                            type={type}
                            className="form-control"
                            id="password"
                          />
                          {login.errors.email && login.touched.email ? (
                            <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                              {login.errors.email}
                            </div>
                          ) : null}
                          <div
                            onClick={viewPassword}
                            className="cursor-pointer icon-view position-absolute end-0 top-50 translate-middle-y"
                          >
                            <i
                              className={`fa-regular ${iconView} mt-1 me-2`}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="rememberPass"
                            id="rememberPass"
                          />
                          <label
                            htmlFor="rememberPass"
                            className="form-check-label"
                          >
                            Remember
                          </label>
                        </div>
                        <div className="forget-pass">
                          <Link
                            className="text-white fs-middle fw-semibold"
                            to="/forget-password"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-10 mt-1">
                      <button
                        disabled={btnLoading}
                        type="submit"
                        className="btn btn-sign-up "
                      >
                        {btnLoading ? (
                          <BtnLoading color={"#B8EC0B"} />
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                    <div className="col-md-10 mt-1">
                      <div
                        className={`${showInvalid} alert alert-danger p-1 fs-small fw-bold`}
                        role="alert"
                      >
                        {invalid}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6 col-lg-7 d-none d-md-block">
                <div className="img-sign-in">
                  <img
                    className="w-100 h-100 object-fit-fill"
                    src={bg}
                    alt=""
                    srcSet=""
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 justify-content-center">
              <div className="col-7 col-md-8 p-0">
                <p className="m-0 mt-2 text-end fs-small">
                  If you have no account, Please Sign Up.
                </p>
              </div>
              <div className="col-6 col-md-4">
                <Link className="btn btn-sign-up btn-sin" to="/sign-up">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
