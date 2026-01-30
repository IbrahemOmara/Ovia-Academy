import React, { useContext } from "react";
import "./HeaderDashboard.css";
import Avatar from "@mui/material/Avatar";
import { StoreContext } from "../../../context/storeContext";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";
import EditeUserImge from "../Profile/EditeUserImge"; // تأكد من مسار الكومبوننت

export default function HeaderDashboard() {
  const userId = JSON.parse(localStorage.getItem("dataAuth"))
    .customerAttributeId;
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

  if (loadingDataUser) return null;

  // رابط الصورة من API
  const profileImage = `${ baseURL }/BunnyImages/DownloadImage?customerId=${userId}`;

  return (
    <div className="header-dashboard blur py-2 px-4 d-flex justify-content-between align-items-center">
      <div className="title-page text-white fs-4 fw-bolder text-center w-75 ms-5">
        {titlePageDashbourd}
      </div>

      <div className="profile w-25 d-flex flex-row-reverse align-items-center">
        <Link
          to="/dashboard-user/my-account"
          className="d-flex justify-content-end"
        >
          <div className="img-profile-dashboard d-flex position-relative">
            <Avatar
              alt={dataUser?.data.nameEn}
              src={profileImage || "/default-avatar.png"}
            />
          </div>
        </Link>

        <div className="desc text-white text-center me-2 d-none d-md-block">
          <h6 className="m-0 fs-small">{dataUser?.data.nameEn}</h6>
          <h6 className="m-0 fs-small">{dataUser?.data.backOfficeId}</h6>
        </div>
      </div>
    </div>
  );
}