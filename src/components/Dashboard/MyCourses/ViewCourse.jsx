import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";

export default function ViewCourse() {
  const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;
  const params = useParams();
  const [index, setIndex] = useState(0);
  const [viewVideo, setViewVideo] = useState(false);
  const url = "https://player.vdocipher.com/v2";

  const getCourseDetials = (idCourse, userId) => {
    return axios.get(
      `${baseURL}/Courses/GetCourseDetails?courseId=${idCourse}&userId=${userId}`
    );
  };

  const { data: details } = useQuery(
    "getCourseDetials",
    () => getCourseDetials(params.id, userId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const getVideos = (idCourse) => {
    return axios.get(`${baseURL}/Videos/GetCourseVideos?courseId=${idCourse}`);
  };

  const { data: videosData, isLoading } = useQuery(
    "getVideos",
    () => getVideos(params.id),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  console.log(videosData);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="view-course">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-7 col-lg-8">
              <h4>{details?.data.name}</h4>
              {
                <div className="">
                  {viewVideo ? (
                    <div className="video">
                      <iframe
                        src={`${url}/?otp=${videosData?.data[index]?.otp}&playbackInfo=${videosData?.data[index]?.playbackInfo}`}
                        style={{
                          border: "0",
                          height: "450px",
                          width: "100%",
                          borderRadius: "15px",
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                        aria-atomic={true}
                        aria-live="polite"
                        title="video"
                      ></iframe>
                      <p>{videosData?.data[index].lectureName}</p>
                    </div>
                  ) : (
                    <div className="">
                      <div className="video img-course my-shadow border rounded-4 overflow-hidden">
                        <img className="w-100 h-100 object-fit-fill" src={details?.data.photo} />
                      </div>
                      <p>{details?.data.desc}</p>
                    </div>
                  )}
                </div>
              }

              {!viewVideo ? (
                <button
                  onClick={() => {
                    setIndex(0);
                    setViewVideo(true);
                  }}
                  className="btn bg-grdient w-100"
                >
                  Start
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-5 col-lg-4 pt-3 mt-4">
              <div className="plal-list">
                <ul
                  className="nav nav-tabs nav-justified border-0"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="module-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#module-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="module-tab-pane"
                      aria-selected="true"
                    >
                      MODULE
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="liveComments-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#liveComments-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="liveComments-tab-pane"
                      aria-selected="false"
                    >
                      LIVE COMMENTS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="module-tab-pane"
                    role="tabpanel"
                    aria-labelledby="module-tab"
                    tabIndex="0"
                  >
                    <div className="row">
                      {videosData?.data.map((video, ind) => {
                        return (
                          <button
                            className="btn fs-small overflow-hidden"
                            key={video.otp}
                            onClick={() => {
                              setIndex(ind % videosData?.data.length);
                              setViewVideo(true);
                            }}
                          >
                            <div className="col-12">
                              <div className="lesson d-flex mt-2 gap-2 align-items-center">
                                {(index === ind) & viewVideo ? (
                                  <i className="fa-solid fa-circle text-main"></i>
                                ) : (
                                  <i className="fa-regular fa-circle"></i>
                                )}
                                <i
                                  className={`fa-regular fa-circle-play  ${
                                    (index === ind) & viewVideo
                                      ? "text-main"
                                      : ""
                                  }`}
                                ></i>
                                <span
                                  className={`fw-bold ${
                                    (index === ind) & viewVideo
                                      ? "text-main"
                                      : ""
                                  }`}
                                >
                                  {ind + 1} -
                                </span>
                                <p
                                  className={`text-black m-0 text-nowrap ${
                                    (index === ind) & viewVideo
                                      ? "text-main"
                                      : ""
                                  } `}
                                >
                                  {video.lectureName.length > 35
                                    ? `${video.lectureName.slice(0, 30)}...`
                                    : video.lectureName}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="liveComments-tab-pane"
                    role="tabpanel"
                    aria-labelledby="liveComments-tab"
                    tabIndex="0"
                  >
                    Live Comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
