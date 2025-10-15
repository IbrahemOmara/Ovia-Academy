import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import PopAllMeeting from "../../Dashboard/DashMeetings/PopAllMeeting";
import "../../Dashboard/DashMeetings/DashMeetings.css";
import PopJoinCode from "../../Dashboard/DashMeetings/PopJoinCode";
import { StoreContext } from "../../../context/storeContext";
import { baseURL } from "../../../utils/baseURL";
import Loading from "../../Loading/Loading";
import CreateMeeting from "./CreateMeeting";

export default function MeetingInstructor() {
  const roomName = 5555;
  const { newMeeting } = useContext(StoreContext);
  const [urlMeetingNow, setUrlMeetingNow] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));

  const style = {
    height: "80vh",
    width: "100%",
    border: "0px",
  };

  const getAllLiveCourseMeetingsForCustomer = (id) => {
    return axios.get(
      `${baseURL}/User/GetAllLiveCourseMeetingsForCustomer?customerAttribueId=${id}`
    );
  };

  const {
    data: LiveCourse,
    isLoading: loadingLiveCourse,
    error: errLiveCourse,
    refetch: refetchAllTrainng,
  } = useQuery(
    "getAllLiveCourseMeetingsForCustomer",
    () => getAllLiveCourseMeetingsForCustomer(dataUser.customerAttributeId),
    {
      //   refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const upcommingLiveCourse = LiveCourse?.data.filter((course) => {
    return new Date(course.trainingDate) - new Date() >= -14400000;
  });

  const joinMeeting = (url) => {
    setUrlMeetingNow(url);
    console.log(url);
  };

  const prepairUrlMeeting = (roomName) => {
    const urlMeeting = `https://livezoon.com/join?room=${roomName}&roomPassword=false&name=${dataUser.name}&roomPassword=false&audio=false&video=false&screen=false&notify=false`;
    return urlMeeting;
  };

  // console.log(LiveCourse?.data);

  if (loadingLiveCourse) return <Loading />;

  return (
    <>
      <section className="dash-Meetings mt-5 position-relative">
        <div className="">
          <div className="row gy-5">
            <div className="col-md-5">
              <div className="row gy-4 pt-1">
                <div className="col-12">
                  <div className="upcoming-meeting py-4 px-3 bg-body rounded-3 shadow-light h-100">
                    <h4 className="fw-bold text-center mb-5">
                      Upcoming Meetings
                    </h4>
                    {errLiveCourse ? (
                      <h3 className="text-center fw-bold">
                        {errLiveCourse?.response?.data}
                      </h3>
                    ) : (
                      <div className="">
                        {upcommingLiveCourse?.map((trainging, ind) => {
                          return ind < 4 ? (
                            <div
                              className="time-meeting d-flex fw-bold"
                              key={trainging.trainingId}
                            >
                              <button
                                onClick={() =>
                                  joinMeeting(() => prepairUrlMeeting(5555))
                                }
                                className="btn flex-grow-1 d-flex gap-3"
                              >
                                <div className="icon-time">
                                  <i className="fa-solid fa-square text-success"></i>
                                </div>
                                <div className="name-meeting">
                                  <p className="fs-6 fw-bold ">
                                    {trainging.trainingName}
                                  </p>
                                </div>
                              </button>
                              <div className="time">
                                <p className="fs-6 ">
                                  {trainging.trainingDate
                                    ? format(
                                        new Date(trainging.trainingDate),
                                        "MMM /d - h : mm a"
                                      )
                                    : ""}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          );
                        })}

                        <PopAllMeeting
                          data={LiveCourse?.data}
                          join={joinMeeting}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="w-100 py-4 px-3 bg-body rounded-3 shadow-light">
                    <h6 className="fw-bold">Create or Join a Meeting</h6>
                    <div className="row align-items-center gy-2">
                      <div className="col-lg-5 pb-1">
                        <CreateMeeting refetchAllTrainng={refetchAllTrainng} nameRoom={roomName}/>
                      </div>
                      <div className="col-lg-7 ps-lg-0">
                        <PopJoinCode join={()=>joinMeeting(()=>prepairUrlMeeting(roomName))} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="now-meeting rounded-4 overflow-hidden shadow">
                {urlMeetingNow ? (
                  <iframe
                    allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                    src={urlMeetingNow}
                    // src="https://livezoon.com/join?room= &name=1228&audio=false&video=false&screen=false&notify=false"
                    // src="https://livezoon.com/join?room=' '&roomPassword=false&name=admin&username=admin&audio=true&video=true&screen=false&notify=false&admin=1&&origin={localhost}&priamry_color=#555555"

                    style={style}
                    className="w-100 object-fit-fill d-block "
                  ></iframe>
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
