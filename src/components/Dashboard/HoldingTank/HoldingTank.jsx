import axios from "axios";
import React, { useEffect, useState } from "react";
import "./HoldingTank.css";
import { useFormik } from "formik";
import { baseURL } from "../../../utils/baseURL";
import { toast, useToast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";

export default function HoldingTank() {
  // const [tanks,setTanks] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [popUp, setPopUp] = useState(0);
  const [childId, setChildId] = useState(0);
  const [handSide, setHandSide] = useState(".");
  const [dataParent, setDataParent] = useState([]);
  const [left, setLeft] = useState("1");
  const [right, setRight] = useState("1");
  const [nameOfParent, setNameOfParent] = useState("");
  const referId = JSON.parse(localStorage.dataAuth).referId;

  const getAllHoldingTank = (id) => {
    return axios.get(`${baseURL}/User/GetAllHoldingTank?sponsorId=${id}`);
  };

  const { data: tanks, isLoading: loadingTanks } = useQuery(
    "getAllHoldingTank",
    () => getAllHoldingTank(referId),
    {
      queryFn: getAllHoldingTank,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  async function checkAboutHisChildren(referId) {
    await axios
      .get(`${baseURL}/User/CheckAboutHisChildren?sponsorId=${referId}`)
      .then(({ data }) => {
        // console.log(data);
        data.map((item) => {
          if (item.handSide == "Left") {
            setLeft(true);
            if (right == "1") {
              setRight(false);
            }
            console.log(left, right);
          }
          if (item.handSide == "Right") {
            setRight(true);
            if (left == "1") {
              setLeft(false);
            }
            console.log(left, right);
          }
        });
        if (data.length < 2 && !left)
          toast.warning("You can add this parent, Choose Left for child");
        if (data.length < 2 && !right)
          toast.warning("You can add this parent, Choose Right for child");
        if (data.length == 2) toast.error("Sorry this parent is full child");
      })
      .catch((error) => {
        console.log(referId);
        console.log(error.response.data);
        if (error.response.data == "Sponsor not have children.")
          toast.success("Yes,You can add this parent");
        setRight(false);
        setLeft(false);
      });
  }

  async function addParentToNewMember(values) {
    await axios
      .post(`${baseURL}/User/AddParentToNewMember`, values)
      .then(({ data }) => {
        // console.log(data);
        toast.success("Successfully added a parent");
      })
      .catch((error) => {
        // console.log();
        console.log(error);
        toast.error(error.response.data);
      });
  }

  async function getDataSponsorId(referId) {
    await axios
      .get(`${baseURL}/User/${referId}`)
      .then(({ data }) => {
        setDataParent(data);
        setNameOfParent(data.name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const togglePop = (id) => {
    if (toggle) {
      setPopUp(id);
      setToggle(!toggle);
      setChildId(id);
    } else {
      setPopUp("");
      setToggle(!toggle);
    }
  };

  const closePopUp = () => {
    setToggle(!toggle);
    setPopUp("");
  };

  const handelSide = (side) => {
    setHandSide(side);
  };

  const checkParent = async () => {
    getDataSponsorId(addParent.values.parentId);
    checkAboutHisChildren(addParent.values.parentId);
  };

  const addParent = useFormik({
    initialValues: {
      parentId: "",
      childId: "",
      handSide: "",
    },
    onSubmit: (values) => {
      values.parentId = dataParent.customerAttributeId;
      values.childId = childId;
      values.handSide = handSide;
      addParentToNewMember(values);
    },
  });

  if (loadingTanks) return <Loading />;

  return (
    <>
      <section className="holding-tank" id="HoldingTank">
        <div className="container">
          <div className="row " style={{color:"#c59846", padding:"20px 0px"}}>
            <div className="col-1 d-none d-md-block "></div>
            <div className="col-2">
              <h6 className="fw-bold">Name</h6>
            </div>
            <div className="col-3">
              <h6 className="fw-bold">Email</h6>
            </div>
            <div className="col-3">
              <h6 className="fw-bold">BackOffice ID</h6>
            </div>
            <div className="col-3">
              <h6 className="fw-bold">Status</h6>
            </div>
          </div>
          {tanks?.data.map((item) => {
            return !item.hasParent ? (
              <div
                key={item.customerAttributeId}
                className="row fs-small fw-semibold position-relative mt-2 py-3 rounded-3 text-black align-items-center table-row"
              >
                <div className="col-1 p-0 ps-1 p-md-2 d-none d-md-block ">
                  <div className="icon">
                    <i className="fa-solid fa-user text-main"></i>
                  </div>
                </div>
                <div className="col-4 col-md-2 p-0 ps-1 p-md-2">
                  <div className="">
                    <p className="m-0">{item.name}</p>
                  </div>
                </div>
                <div className="col-3 p-0 ps-1 p-md-2 ">
                  <div className=" w-100">
                    <p className="m-0  w-100">{item.email}</p>
                  </div>
                </div>
                <div className="col-3 p-0 ps-1 p-md-2 ">
                  <div className="">
                    <p className="m-0 fw-bolder">{item.backOfficeId}</p>
                  </div>
                </div>
                <div className="col-3 p-0 ps-1 p-md-2">
                  <div className="fs-6">
                    <div className="d-flex align-items-center">
                      {item.status === "Active" && !item.hasParent ? (
                        <button
                          onClick={() => togglePop(item.customerAttributeId)}
                          type="button"
                          className="btn d-flex align-items-center gap-1 border-0 p-0 me-1 text-black fs-small text-main  "
                        >
                          <i
                            className={`fa-solid fa-${
                              popUp == item.customerAttributeId
                                ? "chevron-down"
                                : "chevron-right"
                            }`}
                          ></i>
                          <p className="m-0 fs-small">{item.status}</p>
                        </button>
                      ) : (
                        <p className="m-0 fs-small">{item.status}</p>
                      )}
                      
                    </div>
                  </div>
                </div>
                <form
                  className="position-relative"
                  onSubmit={addParent.handleSubmit}
                >
                  <div
                    className={`${
                      popUp == item.customerAttributeId ? "d-block" : "d-none"
                    } pop-up rounded-3  shadow-lg w-100 me-5`}
                  >
                    <div className="close">
                      <button
                        onClick={closePopUp}
                        type="button"
                        className="btn border-0 fs-5 position-absolute top-0 end-0 "
                      >
                        <i className="fa-solid fa-close me-3"></i>
                      </button>
                    </div>
                    <h6 className="text-danger fw-bold ps-3 mt-2">Active</h6>
                    <div className="mb-3 text-start ps-3">
                      <label htmlFor="parentId" className="form-label">
                        Upline ID
                      </label>
                      <div className="sponser ">
                        <div className="row">
                          <div className="col-9">
                            <input
                              onChange={addParent.handleChange}
                              name="parentId"
                              type="text"
                              className="form-control text-black"
                              id="parentId"
                            />
                            <div className="text-main fw-bolder fs-small">
                              {nameOfParent}
                            </div>
                          </div>
                          <div className="col-3">
                            <button
                              onClick={checkParent}
                              type="button"
                              className="btn bg-grdient"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-1 ps-3">
                      <label htmlFor="handSide" className="form-label">
                        Choose Hand Side
                      </label>
                      <div className="row">
                        <div className="col-9">
                          <div className="position-relative rounded-3 border py-2 border-black">
                            <span>{handSide}</span>
                            <div className="position-absolute end-0 top-50 translate-middle-y ">
                              <button
                                disabled={left}
                                onClick={() => handelSide("Left")}
                                type="button"
                                className={`btn p-0 border-0 ${
                                  !left ? "ts-zezag" : ""
                                }`}
                              >
                                <i className="fa-solid fa-caret-left fs-5"></i>
                              </button>
                              <button
                                disabled={right}
                                onClick={() => handelSide("Right")}
                                type="button"
                                className={`btn p-0 me-2 border-0 ${
                                  !right ? "ts-zezag" : ""
                                }`}
                              >
                                <i className="fa-solid fa-caret-right fs-5"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      disabled={left && right}
                      type="submit"
                      className="btn bg-grdient d-block w-50 m-auto mt-3 border-0"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </section>
    </>
  );
}
