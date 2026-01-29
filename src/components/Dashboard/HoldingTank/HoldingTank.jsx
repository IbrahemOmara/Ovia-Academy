import axios from "axios";
import React, { useState } from "react";
import "./HoldingTank.css";
import { useFormik } from "formik";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";

export default function HoldingTank() {
  const [toggle, setToggle] = useState(true);
  const [popUp, setPopUp] = useState(null);
  const [childId, setChildId] = useState(null);
  const [handSide, setHandSide] = useState(".");
  const [dataParent, setDataParent] = useState(null);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [nameOfParent, setNameOfParent] = useState("");

  const referId = JSON.parse(localStorage.dataAuth).referId;

  /* ---------------- API ---------------- */

  const getAllHoldingTank = (id) =>
    axios.get(`${baseURL}/User/GetAllHoldingTank?sponsorId=${id}`);

  const {
    data: tanks,
    isLoading: loadingTanks,
    refetch,
  } = useQuery(
    ["getAllHoldingTank", referId],
    () => getAllHoldingTank(referId),
    {
      refetchOnWindowFocus: false,
    }
  );

  const checkAboutHisChildren = async (sponsorId) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/User/CheckAboutHisChildren?sponsorId=${sponsorId}`
      );

      setLeft(false);
      setRight(false);

      data.forEach((item) => {
        if (item.handSide === "Left") setLeft(true);
        if (item.handSide === "Right") setRight(true);
      });

      if (data.length === 2)
        toast.error("Sorry, this parent already has two children");
    } catch (error) {
      if (error.response?.data === "Sponsor not have children.") {
        setLeft(false);
        setRight(false);
        toast.success("This parent has no children yet");
      }
    }
  };

  const getDataSponsorId = async (id) => {
    const { data } = await axios.get(`${baseURL}/User/${id}`);
    setDataParent(data);
    setNameOfParent(data.name);
  };

  const addParentToNewMember = async (values) => {
    await axios.post(`${baseURL}/User/AddParentToNewMember`, values);
    toast.success("Successfully added a parent");
  };

  /* ---------------- UI Logic ---------------- */

  const togglePop = (id) => {
    setPopUp(id);
    setToggle(false);
    setChildId(id);
    setHandSide(".");
    setLeft(false);
    setRight(false);
    setNameOfParent("");
    setDataParent(null);
  };

  const closePopUp = () => {
    setToggle(true);
    setPopUp(null);
  };

  const handelSide = (side) => setHandSide(side);

  const checkParent = async () => {
    const parentId = addParent.values.parentId;

    if (!parentId) {
      toast.warning("Please enter Parent ID");
      return;
    }

    if (parentId == childId) {
      toast.error("You cannot add user as a parent to himself");
      return;
    }

    await getDataSponsorId(parentId);
    await checkAboutHisChildren(parentId);
  };

  /* ---------------- Formik ---------------- */

  const addParent = useFormik({
    initialValues: {
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!dataParent) {
        toast.warning("Please search for parent first");
        return;
      }

      if (handSide === "." || !handSide) {
        toast.warning("Please choose Left or Right");
        return;
      }

      if ((handSide === "Left" && left) || (handSide === "Right" && right)) {
        toast.error("This side is already taken");
        return;
      }

      const payload = {
        parentId: dataParent.customerAttributeId,
        childId,
        handSide,
      };

      await addParentToNewMember(payload);

      resetForm();
      closePopUp();
      refetch(); // ✅ أنضف حل
    },
  });

  if (loadingTanks) return <Loading />;

  /* ---------------- JSX ---------------- */

  return (
    <section className="holding-tank" id="HoldingTank">
      <div className="container">
        <div className="row fw-bold py-3" style={{ color: "#c59846" }}>
          <div className="col-2">Name</div>
          <div className="col-3">Email</div>
          <div className="col-3">BackOffice ID</div>
          <div className="col-3">Status</div>
        </div>

        {tanks?.data.map(
          (item) =>
            !item.hasParent && (
              <div
                key={item.customerAttributeId}
                className="row align-items-center mt-2 py-3 rounded-3 table-row"
              >
                <div className="col-2">{item.name}</div>
                <div className="col-3">{item.email}</div>
                <div className="col-3 fw-bold">{item.backOfficeId}</div>

                <div className="col-3">
                  {item.status === "Active" && (
                    <button
                      className="btn text-main p-0"
                      onClick={() => togglePop(item.customerAttributeId)}
                    >
                      {item.status}
                    </button>
                  )}
                </div>

                {popUp === item.customerAttributeId && (
                  <form
                    className="pop-up shadow-lg rounded-3"
                    onSubmit={addParent.handleSubmit}
                  >
                    <button
                      type="button"
                      className="btn position-absolute top-0 end-0"
                      onClick={closePopUp}
                    >
                      ✕
                    </button>

                    <h6 className="text-danger fw-bold">Active</h6>

                    <input
                      name="parentId"
                      placeholder="Upline ID"
                      className="form-control"
                      onChange={addParent.handleChange}
                    />

                    <button
                      type="button"
                      className="btn bg-grdient mt-2"
                      onClick={checkParent}
                    >
                      Search
                    </button>

                    {nameOfParent && (
                      <div className="fw-bold text-center mt-2">
                        {nameOfParent}
                      </div>
                    )}

                    <div className="mt-3">
                      <button
                        type="button"
                        disabled={left}
                        onClick={() => handelSide("Left")}
                      >
                        Left
                      </button>

                      <button
                        type="button"
                        disabled={right}
                        onClick={() => handelSide("Right")}
                      >
                        Right
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={left && right}
                      className="btn bg-grdient mt-3"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            )
        )}
      </div>
    </section>
  );
}