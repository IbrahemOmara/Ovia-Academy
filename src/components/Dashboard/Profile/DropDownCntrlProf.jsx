import React from "react";
import PopUpEditDataUser from "./PopUpEditDataUser";

const DropDownCntrlProf = ({refetchDataUser,dataUser}) => {
 
  return (
    <>
      <div className="dropdown">
        <button
          className="btn p-0 border-0 "
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div className="dropdown-menu p-0 w-25 " aria-labelledby="dropdownMenuButton">
          <div
            className="dropdown-item bg-body"
            value=""
          >
            <PopUpEditDataUser dataUser={dataUser} refetchDataUser={refetchDataUser}/>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default DropDownCntrlProf;
