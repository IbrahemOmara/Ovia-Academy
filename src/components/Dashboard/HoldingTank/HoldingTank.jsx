import axios from "axios";
import React, { useState } from "react";
import "./HoldingTank.css";
import { useFormik } from "formik";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";

export default function HoldingTank() {
  const [popUp, setPopUp] = useState("");
  const [childId, setChildId] = useState("");
  const [handSide, setHandSide] = useState(".");
  const [dataParent, setDataParent] = useState({});
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [nameOfParent, setNameOfParent] = useState("");

  const referId = JSON.parse(localStorage.dataAuth).referId;

  /* ================= API ================= */

  const getAllHoldingTank = async () => {
    const res = await axios.get(
      `${baseURL}/User/GetAllHoldingTank?sponsorId=${referId}`
    );
    return res.data;
  };

  const { data: tanks, isLoading } = useQuery(
    ["getAllHoldingTank", referId],
    getAllHoldingTank,
    { refetchOnWindowFocus: false }
  );

  const checkAboutHisChildren = async (id) => {
    setLeft(false);
    setRight(false);

    try {
      const { data } = await axios.get(
        `${baseURL}/User/CheckAboutHisChildren?sponsorId=${id}`
      );

      data.forEach((item) => {
        if (item.handSide === "Left") setLeft(true);
        if (item.handSide === "Right") setRight(true);
      });

      if (data.length === 2) {
        toast.error("Sorry this parent is full child");
      } else {
        if (!left) toast.warning("Choose Left for child");
        if (!right) toast.warning("Choose Right for child");
      }
    } catch (error) {
      if (error.response?.data === "Sponsor not have children.") {
        toast.success("Yes, You can add this parent");
        setLeft(false);
        setRight(false);
      }
    }
  };

  const getDataSponsorId = async (id) => {
    try {
      const { data } = await axios.get(`${baseURL}/User/${id}`);
      setDataParent(data);
      setNameOfParent(data.name);
    } catch {
      toast.error("Parent not found");
    }
  };

  const addParentToNewMember = async (values) => {
    try {
      await axios.post(`${baseURL}/User/AddParentToNewMember`, values);
      toast.success("Successfully added a parent");
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  /* ================= Handlers ================= */

  const togglePop = (id) => {
    setPopUp((prev) => (prev === id ? "" : id));
    setChildId(id);
  };

  const closePopUp = () => {
    setPopUp("");
  };

  const handelSide = (side) => {
    setHandSide(side);
  };

  const checkParent = async () => {
    if (!addParent.values.parentId) return;
    await getDataSponsorId(addParent.values.parentId);
    await checkAboutHisChildren(addParent.values.parentId);
  };

  /* ================= Formik ================= */

  const addParent = useFormik({
    initialValues: {
      parentId: "",
    },
    onSubmit: () => {
      addParentToNewMember({
        parentId: dataParent.customerAttributeId,
        childId,
        handSide,
      });
    },
  });

  if (isLoading) return <Loading />;

  /* ================= JSX ================= */

  return (
    <section className="holding-tank" id="HoldingTank">
      <div className="container">
        <div className="row" style={{ color: "#c59846", padding: "20px 0px" }}>
          <div className="col-1 d-none d-md-block"></div>
          <div className="col-2"><h6 className="fw-bold">Name</h6></div>
          <div className="col-3"><h6 className="fw-bold">Email</h6></div>
          <div className="col-3"><h6 className="fw-bold">BackOffice ID</h6></div>
          <div className="col-3"><h6 className="fw-bold">Status</h6></div>
        </div>

        {tanks?.map((item) =>
          !item.hasParent ? (
            <div
              key={item.customerAttributeId}
              className="row fs-small fw-semibold position-relative mt-2 py-3 rounded-3 text-black align-items-center table-row"
            >
              <div className="col-1 d-none d-md-block">
                <i className="fa-solid fa-user text-main"></i>
              </div>

              <div className="col-2"><p>{item.name}</p></div>
              <div className="col-3"><p>{item.email}</p></div>
              <div className="col-3"><p className="fw-bolder">{item.backOfficeId}</p></div>

              <div className="col-3">
                {item.status === "Active" ? (
                  <button
                    onClick={() => togglePop(item.customerAttributeId)}
                    className="btn border-0 p-0 text-main"
                  >
                    <i
                      className={`fa-solid fa-${
                        popUp === item.customerAttributeId
                          ? "chevron-down"
                          : "chevron-right"
                      }`}
                    ></i>
                    {item.status}
                  </button>
                ) : (
                  <p>{item.status}</p>
                )}
              </div>

              {/* ================= POPUP ================= */}
              <form onSubmit={addParent.handleSubmit}>
                <div
                  className={`${
                    popUp === item.customerAttributeId ? "d-block" : "d-none"
                  } pop-up rounded-3 shadow-lg`}
                >
                  <button
                    type="button"
                    onClick={closePopUp}
                    className="btn position-absolute top-0 end-0"
                  >
                    <i className="fa-solid fa-close"></i>
                  </button>

                  <h6 className="text-danger fw-bold ps-3 mt-2">Active</h6>

                  <div className="ps-3">
                    <label>Upline ID</label>
                    <input
                      name="parentId"
                      onChange={addParent.handleChange}
                      className="form-control"
                      
                    />
                    <div className="text-main text-center mt-2" style={{textAlign:"center", backgroundColor:"#2cb905d0" , fontSize:"1.5rem", fontWeight:"bold"}}>
                      {nameOfParent}
                    </div>
                    <button
                      type="button"
                      onClick={checkParent}
                      className="btn bg-grdient mt-2"
                    >
                      Search
                    </button>
                  </div>

                  <div className="ps-3 mt-3">
                    <label>Choose Hand Side</label>
                    <div>
                      <button
                        type="button"
                        disabled={left}
                        onClick={() => handelSide("Left")}
                      >
                        ◀
                      </button>
                      <span className="mx-2">{handSide}</span>
                      <button
                        type="button"
                        disabled={right}
                        onClick={() => handelSide("Right")}
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={left && right}
                    type="submit"
                    className="btn bg-grdient d-block m-auto mt-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}