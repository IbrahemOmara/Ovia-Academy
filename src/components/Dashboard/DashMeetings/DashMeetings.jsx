import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";
import { format } from "date-fns";
import CreateMeeting from "./CreateMeeting";
import PopAllMeeting from "./PopAllMeeting";
import { StoreContext } from "../../../context/storeContext";
import "./DashMeetings.css";
import PopJoinCode from "./PopJoinCode";
import ShowMeeting from "./ShowMeeting";
import { useNavigate } from "react-router-dom";

export default function DashMeetings() {
  const { newMeeting } = useContext(StoreContext);
  const [urlMeetingNow, setUrlMeetingNow] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [fullScreen, setFullScreen] = useState(""); //position-absolute top-0 start-0 w-100 h-100 z-3
  const [isExpand, setIsExpand] = useState(false);
  const navagite = useNavigate();

  const style = {
    height: "100vh",
    width: "100%",
    border: "0px",
  };

  const toggleScreen = () => {
    if (fullScreen === "") {
      setFullScreen("position-absolute top-0 start-0 w-100 vh-100 z-3");
      setIsExpand(true);
    } else {
      setFullScreen("");
      setIsExpand(false);
    }
  };

  const getAllTrainningsForCustomer = (id) => {
    return axios.get(
      `${baseURL}/User/GetAllTrainningsForCustomer?customerAttribueId=${id}`
    );
  };

  const {
    data: trainingCourse,
    isLoading: loadingTrainingCourse,
    error: errTrainingCourse,
    refetch: refetchAllTrainng,
  } = useQuery(
    "getAllTrainningsForCustomer",
    () => getAllTrainningsForCustomer(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const upcommingTraining = trainingCourse?.data.filter((trainging) => {
    return new Date(trainging.trainingDate) - new Date() >= -14400000;
  });

  const joinMeeting = (url) => {
    setLoadingUrl(true);
    setUrlMeetingNow(url);
    setLoadingUrl(false);
  };

  useEffect(() => {
    if (!dataUser.allowToCreateMeeting) {
      navagite("/dashboard-user");
    }
  }, []);

  if (loadingTrainingCourse) return <Loading />;

  return (
    <>
      <section className="dash-Meetings mt-5 position-relative ">
        <div className="">
          <div className={`row position-relative`}>
            <div className="col-md-5">
              <div className="row gy-4 pt-1">
                <div className="col-12">
                  <div className="upcoming-meeting py-4 px-3 bg-body rounded-3 shadow-light h-100">
                    <h4 className="fw-bold text-center mb-5">
                      Upcoming Meetings
                    </h4>
                    {errTrainingCourse ? (
                      <h3 className="text-center fw-bold">
                        {errTrainingCourse?.response?.data}
                      </h3>
                    ) : (
                      upcommingTraining?.map((trainging, ind) => {
                        return ind < 4 ? (
                          <ShowMeeting
                            key={ind}
                            dataUser={dataUser}
                            trainging={trainging}
                            joinMeeting={joinMeeting}
                          />
                        ) : (
                          ""
                        );
                      })
                    )}
                    <PopAllMeeting
                      data={trainingCourse?.data}
                      join={joinMeeting}
                    />
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="w-100 py-4 px-3 bg-body rounded-3 shadow-light">
                    <h6 className="fw-bold">Create or Join a Meeting</h6>
                    <div className="row align-items-center gy-3">
                      <div className="col-md-5 pb-1">
                        <CreateMeeting refetchAllTrainng={refetchAllTrainng} />
                      </div>
                      <div className="col-md-7 ps-md-0">
                        <PopJoinCode join={joinMeeting} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-7 ${fullScreen}`}>
              <div className="now-meeting rounded-4 overflow-hidden shadow position-relative">
                <button
                  disabled={!urlMeetingNow}
                  onClick={toggleScreen}
                  className="btn border-0 p-0 toggle-screen text-white d-block ms-auto"
                >
                  <i
                    className={`fa-solid fa-${
                      isExpand ? "compress" : "expand"
                    } fa-2x`}
                  ></i>
                </button>
                {urlMeetingNow ? (
                  <iframe
                    allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                    src={urlMeetingNow}
                    style={style}
                    className="w-100 object-fit-fill d-block "
                  ></iframe>
                ) : loadingUrl ? (
                  <Loading />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center rounded-4 overflow-hidden shadow border"
                    style={{ height: "80vh" }}
                  >
                    <h5 className="text-center text-white">No Meeting Now</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              {newMeeting ? (
                <div className="card-meeting py-4 px-4 bg-body rounded-3 shadow-light">
                  <div className="info-meeting d-flex justify-content-between">
                    <p>creation Date</p>
                    <span className="fw-bold">
                      {newMeeting.creationDate
                        ? format(
                            new Date(newMeeting.creationDate),
                            "MMM /d - h:m a"
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="info-meeting d-flex justify-content-between">
                    <p>Time of Meeting </p>
                    <span className="fw-bold">
                      {newMeeting?.date
                        ? format(new Date(newMeeting.date), "MMM /d - h:m a")
                        : ""}
                    </span>
                  </div>
                  <div className="info-meeting d-flex justify-content-between">
                    <p>trainning Code </p>
                    <span className="fw-bold">{newMeeting.trainningCode}</span>
                  </div>
                  <div className="info-meeting d-flex justify-content-between">
                    <p>trainning Name</p>
                    <span className="fw-bold">{newMeeting.trainningName}</span>
                  </div>
                  <div className="info-meeting d-flex justify-content-between border">
                    <p>trainning Url</p>
                    <span className="fw-bold w-50">{newMeeting.url}</span>
                  </div>
                </div>
              ) : (
                <div className="card-meeting py-4 px-4 bg-body rounded-3 shadow-light h-100">
                  <h3>No Meeting Create!</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
