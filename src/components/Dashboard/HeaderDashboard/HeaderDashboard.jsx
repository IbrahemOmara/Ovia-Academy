import React, { useContext, useEffect } from "react";
import "./HeaderDashboard.css";
import Avatar from "@mui/material/Avatar";
import { StoreContext } from "../../../context/storeContext";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";
export default function HeaderDashboard() {

  const userId = JSON.parse(
    localStorage.getItem("dataAuth")
  ).customerAttributeId;
  const { titlePageDashbourd } = useContext(StoreContext);
  
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


  if (loadingDataUser) return "";

  return (
    <>
      <div className="header-dashboard blur py-2 px-4">
        <div className="title-page text-white fs-4 ms-5 fw-bolder w-75 text-center">
          {titlePageDashbourd}
        </div>
        <div className="profile w-25 d-flex flex-row-reverse align-items-center">
          <Link
            to="/dashboard-user/my-account"
            className="d-flex justify-content-end "
          >
            <div className="img-profile-dashboard d-flex ">
              <Avatar
                alt={dataUser?.data.nameEn}
                src={dataUser?.data.pictureUrl}
              />
            </div>
          </Link>
          <div className="desc text-white text-center me-2 d-none d-md-block">
            <h6 className="m-0 fs-small">{dataUser?.data.nameEn}</h6>
            <h6 className="m-0 fs-small">{dataUser?.data.backOfficeId}</h6>
          </div>
        </div>
      </div>
    </>
  );
}
