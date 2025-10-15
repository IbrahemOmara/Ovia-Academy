import React from "react";
import PopFromCreateMeeting from "./PopFormCreateMeeting";

export default function CreateMeeting({refetchAllTrainng}) {
  return (
    <>
      <div className="create-meeting ">
        <PopFromCreateMeeting refetchAllTrainng={refetchAllTrainng}/>
      </div>
    </>
  );
}
