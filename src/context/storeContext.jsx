import { createContext, useState } from "react";
export const StoreContext = createContext(0);

export default function StoreContextProvider({ children }) {
  const userId = JSON.parse(localStorage.getItem("dataAuth"))?.customerAttributeId;
  const token = JSON.parse(localStorage.getItem("dataAuth"))?.token;
  let [titlePageDashbourd, setTitlePageDashbourd] = useState("Main Dashboard");
  const [togglePopUpBankWall, setTogglePopUpBankWall] = useState(true);
  const [showPopUp, setShowPopUp] = useState("d-none");
  const [confirmOtpShow, setConfirmOtpShow] = useState("d-none");
  const [dayName, setDayName] = useState("");
  const [newMeeting, setNewMeeting] = useState();
  const [buyPkg, setBuyPkg] = useState(false);


  return (
    <StoreContext.Provider
      value={{
        titlePageDashbourd,
        setTitlePageDashbourd,
        togglePopUpBankWall,
        setTogglePopUpBankWall,
        showPopUp,
        setShowPopUp,
        confirmOtpShow,
        setConfirmOtpShow,
        dayName,
        setDayName,
        newMeeting,
        setNewMeeting,
        buyPkg,
        setBuyPkg,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
