import React, { useEffect, useState } from "react";
import "./SignUp.css";
import logo from "../../assets/Ovia-logo/Ovia.png";
import bg from "../../assets/Ovia-logo/bg-ovia.png";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { baseURL } from "../../utils/baseURL";
import BtnLoading from "../BtnLoading/BtnLoading";

export default function SignUp() {
  let navigate = useNavigate();
  const [sponsorData, setSponsorData] = useState({});
  const [disabled, setDisabled] = useState("btn disabled opacity-25 border-0");
  const [countries, setCountries] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFound, setEmailFound] = useState("d-none");
  const [isSearchedSpons, setIsSearchedSpons] = useState(false);
  const [notValidSponsId, setNotValidSponsId] = useState("d-none");
  // const [countriesName,]

  async function getAllCountries() {
  await axios
    .get(`${baseURL}/User/GeTAllCountries`)
    .then(({ data }) => {
      setCountries(data.data || []); // ✅ الحل
    })
    .catch((error) => {
      console.log(error.response?.data?.message || error.message);
    });
}

  //search about sponsor id to register
  async function searchSponserId(id) {
    await axios
      .get(`${baseURL}/User/${id}`)
      .then(({ data }) => {
        setSponsorData(data);
        if (data.backOfficeId == id) {
          setDisabled("");
          setNotValidSponsId("d-none");
        }
      })
      .catch((error) => {
        setNotValidSponsId("d-block");
      });
  }

  function authenticate(values) {
    axios
      .post(`${baseURL}/User/authenticate`, values)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("dataAuth", JSON.stringify(data));
        navigate("/packages");
      })
      .catch((error) => {
        console.log(values);
        console.log(error);
      });
  }

  //send data user to api
  function sendDataToApi(values) {
    // setLoading(true);
    setBtnLoading(true);
    axios
      .post(`${baseURL}/User/NewSignup`, values)
      .then(({ data }) => {
        console.log(data);
        const values = {
          username: data.email,
          password: data.password,
        };
        authenticate(values);
        setBtnLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        setEmailFound("d-block");
        setBtnLoading(false);
      });
  }

  //form validation using  YUP
  function validationSchema() {
    let schema = new Yup.object({
      fName: Yup.string().min(2).max(20).required(),
      lName: Yup.string().min(2).max(20).required(),
      email: Yup.string().email().required(),
      phoneNumber: Yup.string().required(),
      nationalId: Yup.string().required(),
      countryId: Yup.string().required(),
      sponsorId: Yup.string().min(4).required(),
    });

    return schema;
  }

  //get data from  form and validate
  let register = useFormik({
    initialValues: {
      sponsorId: "",
      email: "",
      phoneNumber: "",
      fName: "",
      lName: "",
      countryId: 63,
      nationalId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const name = values.fName + " " + values.lName;
      delete values.fName;
      delete values.lName;
      values.name = name;
      values.countryId = parseInt(values.countryId);
      console.log(values);
      sendDataToApi(values);
    },
  });

  //fuction search and allow form to submit
  const search = async (sponsorId) => {
    await searchSponserId(sponsorId);
  };

  const toggleSponsorId = () => {
    if (isSearchedSpons) {
      setDisabled("btn disabled opacity-25 border-0");
      searchSponserId(register.values.sponsorId);
    }
    setIsSearchedSpons(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getAllCountries();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {loading ? <Loading /> : ""}
      <section className="sign-up" id="signUp">
        <div className="bg-sign-up">
          <img src={bg} className="w-100 h-100 object-fit-fill" />
        </div>
        <div className="container">
          <div className="bg-form sign-up-content">
            <div className="ms-2 header-form text-center">
              <div className="row d-flex ">
                <div className="col-md-5 p-0 w-100 mb-3">
                  <Link to="/">
                    <div className="logo">
                      <img className="w-100 h-100 " src={logo} />
                    </div>
                  </Link>
                </div>
                <div className="col-md-7 w-100">
                  <h3 className="m-0 fw-bolder mt-2 text-center text-md-start text-sin ">
                    Welcome
                  </h3>
                </div>
              </div>
            </div>
            <form
              aria-disabled
              onSubmit={register.handleSubmit}
              onChange={register.handleChange}
              className="mt-4 w-100"
            >
              <div className="row justify-content-around ">
                <div className="col-md-6 ">
                  <div className="mb-3 text-start">
                    <label htmlFor="sponsorId" className="form-label ">
                      Sponsor ID
                    </label>
                    <div className="sponser d-flex gap-2 ">
                      <input
                        onKeyUp={toggleSponsorId}
                        onChange={register.handleChange}
                        name="sponsorId"
                        type="text"
                        className="form-control"
                        id="sponsorId"
                      />
                      <button
                        // disabled={btnLoading}
                        onClick={() => search(register.values.sponsorId)}
                        type="button"
                        className="btn btn-search text-white "
                      >
                        {/* {btnLoading ? <BtnLoading /> : "Search"} */}
                        Search
                      </button>
                    </div>
                    {register.errors.sponsorId && register.touched.sponsorId ? (
                      <div className="w-100 border d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.sponsorId}
                      </div>
                    ) : null}
                    <div
                      className={`${notValidSponsId} alert alert-danger p-1 fs-small mt-2 w-100`}
                      role="alert"
                    >
                      ID Not Found, Please enter valid ID
                    </div>
                  </div>
                </div>
                <div className={`${disabled} col-md-5 pe-4`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="sponsorName" className="form-label">
                      Your Sponser Name{" "}
                    </label>
                    <input
                      disabled
                      value={sponsorData.name}
                      onChange={register.handleChange}
                      name="sponsorName"
                      type="text"
                      className="form-control not-allowed"
                      id="sponsorName"
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-around">
                <div className={`${disabled} col-md-5 pe-4 offset-md-0`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      onChange={register.handleChange}
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                    />
                    {register.errors.email && register.touched.email ? (
                      <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={`${disabled} col-md-5 offset-md-1 pe-4`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      onChange={register.handleChange}
                      name="phoneNumber"
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                    />
                    {register.errors.phoneNumber &&
                    register.touched.phoneNumber ? (
                      <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.phoneNumber}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row justify-content-around">
                <div className={`${disabled} col-md-5 pe-4 offset-md-0`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="fName" className="form-label">
                      First Name{" "}
                    </label>
                    <input
                      onChange={register.handleChange}
                      name="fName"
                      type="text"
                      className="form-control"
                      id="fName"
                    />
                    {register.errors.fName && register.touched.fName ? (
                      <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.fName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={`${disabled} col-md-5 offset-md-1 pe-4`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="lName" className="form-label">
                      Last Name{" "}
                    </label>
                    <input
                      onChange={register.handleChange}
                      name="lName"
                      type="text"
                      className="form-control"
                      id="lName"
                    />
                    {register.errors.lName && register.touched.lName ? (
                      <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.lName}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row justify-content-around">
                <div className={`${disabled} col-md-5  pe-4 offset-md-0`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="countryId" className="form-label">
                      Your Country
                    </label>
                    <select
                      onChange={register.handleChange}
                      className="form-select"
                      name="countryId"
                      id="countryId"
                    >
                      {countries.map((country) => {
                        return (
                          <option
                            key={country.id}
                            value={country.id}
                            selected={country.id == 63}
                          >
                            {country.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className={`${disabled} col-md-5 offset-md-1 pe-4`}>
                  <div className="mb-3 text-start">
                    <label htmlFor="nationalId" className="form-label">
                      National ID
                    </label>
                    <input
                      onChange={register.handleChange}
                      name="nationalId"
                      type="text"
                      className="form-control"
                      id="nationalId"
                    />
                    {register.errors.nationalId &&
                    register.touched.nationalId ? (
                      <div className="d-flex align-items-center mt-2 alert alert-danger alert-input">
                        {register.errors.nationalId}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={`row justify-content-center`}>
                <div className="col-md-7 mt-3">
                  <button
                    disabled={btnLoading}
                    type="submit"
                    className={`${disabled} btn btn-sign-up`}
                  >
                    {btnLoading ? <BtnLoading /> : "Sign Up"}
                  </button>
                </div>
                <div className="col-md-7 mt-2">
                  <div
                    className={`${emailFound} alert alert-danger p-2`}
                    role="alert"
                  >
                    email already exists
                  </div>
                </div>
              </div>
            </form>
            <div className="row mt-4 justify-content-center w-100 ">
              <div className="col-12 col-md-5 p-0">
                <p className="m-0 mt-2 text-center fs-small">
                  If you have account, Please Sign in.
                </p>
              </div>
              <div className="col-12 col-md-4">
                <Link className="btn btn-sign-up not-active" to="/sign-in">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
