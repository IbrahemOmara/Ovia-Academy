import React, { useState } from "react";
import imgEents from "../../../assets/images/events/event.jpg";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Events.css';

export default function Events() {
  const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  
  const buyEvent = (values) => {
    axios
      .post(`${baseURL}/Event/BuyEvent`, values)
      .then((data) => {
        console.log(data);
        navigate(`/ticket/${data.data.ticketID}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function CheckTokenStatus(token) {
    await axios
      .get(`${baseURL}/User/CheckTokenStatus?tokenNumber=${token}`)
      .then(({ data }) => {
        console.log(data.isUsed);
        if (data.isUsed === false) {
            setStatus(false);
          toast.success("OK,Valid Token");
        } else {
          
          setStatus(true);
          toast.error("Invalid Token");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setStatus(true);
        toast.error(error.response.data);
      });
  }

  const checkToken = () => {
    CheckTokenStatus(event.values.token);
  };

  let event = useFormik({
    initialValues: {
      customerEventID: 1,
      customerID: userId,
      name: "",
      email: "",
      mobile: "",
      token: "",
    },
    onSubmit: () => {
      event.customerID = userId;
      event.customerEventID = 5;
      console.log(event.values);
      buyEvent(event.values);
    },
  });

  return (
    <>
      <section className="events mt-5">
        <div className="container">
          <div className="row px-3">
            <div
              className="col-12 rounded-4 overflow-hidden p-0"
              style={{ height: "250px" }}
            >
              <img className="w-100 h-100 object-fit-fill" src={imgEents} />
            </div>
            <div className="">
              <form onSubmit={event.handleSubmit} className="">
                <div className="row mt-3 justify-content-center">
                  <div className="col-md-6">
                    <input
                      onChange={event.handleChange}
                      type="text"
                      className="form-control"
                      name="name"
                      id=""
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-md-6">
                    <input
                      onChange={event.handleChange}
                      type="email"
                      className="form-control"
                      name="email"
                      id=""
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-md-6">
                    <input
                      onChange={event.handleChange}
                      type="tel"
                      className="form-control"
                      name="mobile"
                      id=""
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="row mt-3 justify-content-end">
                  <div className="col-md-6 d-flex justify-content-center">
                    <input
                      onChange={event.handleChange}
                      type="text"
                      className="form-control"
                      name="token"
                      id=""
                      placeholder="Token"
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      onClick={checkToken}
                      type="button"
                      className="btn bg-grdient"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="row mt-3 justify-content-center">
                  <div className="col-12">
                    <button
                        disabled={status}
                      type="submit"
                      className="btn bg-grdient d-block w-50  m-auto"
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
