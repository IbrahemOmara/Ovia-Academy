import React from "react";
import PopFormCreateMeetingInst from "./PopFormCreateMeetingInst";

export default function CreateMeeting({refetchAllTrainng,nameRoom}) {
  return (
    <>
      <div className="create-meeting ">
        <PopFormCreateMeetingInst refetchAllTrainng={refetchAllTrainng} nameRoom={nameRoom}/>
      </div>
    </>
  );
}
