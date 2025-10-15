import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";
import ProgressBorder from "../../ProgressBorder/ProgressBorder";
import EditeUserImge from "./EditeUserImge";
import DropDownCntrlProf from "./DropDownCntrlProf";
import { StoreContext } from "../../../context/storeContext";

export default function Profile() {
  const userId = JSON.parse(localStorage.getItem("dataAuth")).customerAttributeId;
  const filledValue = (50 / 100) * 360; // 360 degress for a full circle
  const remainedValue = 360 - filledValue;
  const [offset, setOffset] = useState(0);

  const data0 = [
    { name: "Remained", value: remainedValue },
    { name: "description", value: filledValue },
  ];

  const getUserDetails = (id) => {
    return axios.get(`${baseURL}/User/GetUserDetails?userId=${id}`);
  };

  const {
    data: dataUser,
    isLoading: loadingDataUser,
    refetch: refetchDataUser,
  } = useQuery("getUserDetails", () => getUserDetails(userId), {
    refetchInterval: false,
  });

  console.log(dataUser?.data);

  if (!dataUser) return <Loading />;

  return (
    <>
      <section className="my-profile mt-4">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-md-6">
              <div className="box-prof">
                <div className="head-box-prof d-flex justify-content-between">
                  <h6 className="my-fw-bold">Personal Information</h6>
                  <div className="control">
                    <DropDownCntrlProf dataUser={dataUser} refetchDataUser={refetchDataUser}/>
                  </div>
                </div>
                <div className="img-prof mt-4 position-relative d-flex align-items-center justify-content-center">
                  <div className="progressCi">
                    <ProgressBorder percentage={50} />
                  </div>
                  <Avatar
                    sx={{ width: 100, height: 100, background: "" }}
                    alt={dataUser?.data?.nameEn}
                    src={dataUser?.data?.pictureUrl}
                  />
                  <div className="edit-img-prof">
                    <EditeUserImge refetchDataUser={refetchDataUser} userId={userId} />
                  </div>
                </div>
                <div className="desc-profile my-fw-bold mt-5 mb-3">
                  <h5 className="my-fw-bold text-center">
                    {dataUser?.data?.nameEn}
                  </h5>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>ID</label>
                    <span>{dataUser?.data.backOfficeId}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Email</label>
                    <span>{dataUser?.data.email}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>ID Sponsor</label>
                    <span>{dataUser?.data.sponsorId}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Country Name</label>
                    <span>{dataUser?.data.countryName}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Start Date</label>
                    <span>
                      {dataUser
                        ? format(
                            new Date(dataUser?.data.startDate),
                            "MMM d, y h:m a"
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Your Role</label>
                    <span>{dataUser?.data.role}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Mobile</label>
                    <span>{dataUser?.data.mobile}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>Whatsapp Mobile</label>
                    <span>{dataUser?.data.whatsappmobile}</span>
                  </div>
                  <div className="border-bottom py-2 d-flex justify-content-between">
                    <label>National Id</label>
                    <span>{dataUser?.data.nationalId || "No Rank"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="box-prof">
                <div className="head-box-prof d-flex gap-5 justify-content-between">
                  <h6 className="my-fw-bold">Personal Information</h6>
                  <div className="control ms-5">
                    <button className="btn p-0 border-0">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
                <div className="navs-prof mt-4">
                  <ul
                    className="nav nav-tabs justify-content-between border-0"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item " role="presentation">
                      <button
                        className="nav-link active btn p-0"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="home-tab-pane"
                        aria-selected="true"
                      >
                        Current
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn p-0"
                        id="history-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#history-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="history-tab-pane"
                        aria-selected="false"
                      >
                        History
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn p-0"
                        id="last-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#last-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="last-tab-pane"
                        aria-selected="false"
                      >
                        Last
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content mt-4" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabIndex={0}
                    >
                      <div className="">
                        <div className="row text-black">
                          <div className="col-12">
                            <div className="progress-t d-flex justify-content-center">
                              <label>
                                <div className="d-flex flex-column align-items-center">
                                  <span>{(filledValue / 360) * 100}%</span>
                                  <span>Completed</span>
                                </div>
                                <progress max="100" value="45"></progress>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="excutive">
                          <h3 className="my-fw-bold text-center m-0">
                            Excutive
                          </h3>
                          <p className="fw-bold text-muted text-center lh-1">
                            You have {(remainedValue / 360) * 100}% left
                          </p>
                        </div>
                        <div className="view-rank border mt-5 pt-5 pb-3">
                          <button className="btn bg-grdient d-block m-auto">
                            View Rank Requirement
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="history-tab-pane"
                      role="tabpanel"
                      aria-labelledby="history-tab"
                      tabIndex={0}
                    >
                      <p className="text-black">history Sooooon</p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="last-tab-pane"
                      role="tabpanel"
                      aria-labelledby="last-tab"
                      tabIndex={0}
                    >
                      <p className="text-black">last Sooooon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="box-prof h-auto "></div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
