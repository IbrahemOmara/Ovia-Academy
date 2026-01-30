import React, { useState, useEffect } from "react";
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

export default function Profile() {
  const userId = JSON.parse(localStorage.getItem("dataAuth"))
    .customerAttributeId;

  const filledValue = (50 / 100) * 360; // مثال لنسبة التقدم
  const remainedValue = 360 - filledValue;

  // حالة لتحديث الصورة بعد رفعها
  const [profileImage, setProfileImage] = useState("");

  // دالة لتحديث رابط الصورة من API
  const fetchProfileImage = () => {
    const imageUrl = `${ baseURL }/BunnyImages/DownloadImage?customerId=${userId}`;
    setProfileImage(imageUrl);
  };

  // جلب بيانات المستخدم
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

  // استدعاء fetchProfileImage عند تحميل الكومبوننت
  useEffect(() => {
    fetchProfileImage();
  }, [userId]);

  if (loadingDataUser) return <Loading />;

  return (
    <section className="my-profile mt-4">
      <div className="container">
        <div className="row gy-4 justify-content-center">
          <div className="col-md-12 col-lg-12">
            <div className="box-prof">
              {/* عنوان الصفحة وزر القائمة */}
              <div className="head-box-prof d-flex justify-content-between">
                <h6 className="my-fw-bold">Personal Information</h6>
                <div className="control">
                  <DropDownCntrlProf
                    dataUser={dataUser}
                    refetchDataUser={refetchDataUser}
                  />
                </div>
              </div>

              {/* صورة البروفايل */}
              <div className="img-prof mt-4 position-relative d-flex align-items-center justify-content-center">
                <div className="progressCi">
                  <ProgressBorder percentage={50} />
                </div>

                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt={dataUser?.data?.nameEn}
                  src={profileImage || "/default-avatar.png"}
                />

                {/* زر رفع الصورة */}
                <div className="edit-img-prof">
                  <EditeUserImge
                    refetchDataUser={() => {
                      refetchDataUser(); // تحديث بيانات المستخدم
                      fetchProfileImage(); // تحديث الصورة
                    }}
                    userId={userId}
                  />
                </div>
              </div>

              {/* بيانات المستخدم */}
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
        </div>
      </div>
    </section>
  );
}