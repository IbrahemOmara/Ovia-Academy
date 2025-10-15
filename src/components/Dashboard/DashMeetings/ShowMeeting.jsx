import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import axios from "axios";

export default function ShowMeeting({ trainging, joinMeeting, dataUser }) {
  const [activeMeeting, setActiveMeeting] = useState("");

  const getTrainningByCode = async (code) => {
    try {
      const response = await axios.get(`${baseURL}/User/GetTrainningByCode?TrainningCode=${code}`);
      return response.data.createdBy;
    } catch (err) {
      toast.error(err.response);
      console.error(err);
    }
  };

  const prepairUrlMeeting = async (roomName, code) => {
    let urlMeeting;
    const id = await getTrainningByCode(code);
    if (id === dataUser.customerAttributeId) {
      urlMeeting = `https://livezoon.com/join?room=${roomName}&roomPassword=false&name=admin&username=admin&audio=true&video=false&screen=false&notify=false&admin=1&&origin=ncomes.network&priamry_color=#223f4a`;
    } else {
      urlMeeting = `https://livezoon.com/join?room=${roomName}&roomPassword=false&name=${dataUser.name}&roomPassword=false&audio=false&video=false&screen=false&notify=false`;
    }
    return urlMeeting;
  };

  const handleJoinMeeting = async (roomName, code, e) => {
    const clickedDiv = e.currentTarget.querySelector(".name-meeting");

    // Remove 'text-main' class from all divs
    document.querySelectorAll(".name-meeting").forEach((div) => {
      div.classList.remove("text-main");
    });

    // Add 'text-main' class to the clicked div
    clickedDiv.classList.add("text-main");

    // Update state to track active meeting (optional)
    setActiveMeeting(clickedDiv);

    // Join the meeting with the prepared URL
    joinMeeting(await prepairUrlMeeting(roomName, code));
  };

  return (
    <>
      <div className="`time-meeting` d-flex fw-bold" key={trainging.trainingId}>
        <button
          onClick={ (e) => handleJoinMeeting(trainging.trainingName, trainging.trainningCode, e)
          }
          className="btn flex-grow-1 d-flex gap-3 border-0 "
        >
          <div className="icon-time">
            <i className="fa-solid fa-square text-success"></i>
          </div>
          <div className={`name-meeting ${activeMeeting}`}>
            <p className="fs-6 fw-bold ">{trainging.trainingName}</p>
          </div>
        </button>
        <div className="time">
          <p className="fs-6 ">
            {trainging.trainingDate
              ? format(new Date(trainging.trainingDate), "MMM /d - h : mm a")
              : ""}
          </p>
        </div>
      </div>
    </>
  );
}
