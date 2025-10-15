import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderDashboard from "../components/Dashboard/HeaderDashboard/HeaderDashboard";
import SidebarInst from "../components/DashboardInstructor/SidebarInst/SidebarInst";

export default function InstructorLayout() {
  const [$toggleSidebar, set$ToggleSidebar] = useState(true);
  const [show, setShow] = useState("translatex-x-101");
  const [col, setCol] = useState(12);
  const [zero,setZero] = useState(0);
  const toggleSidebar = () => {
    if ($toggleSidebar) {
      setShow("");
      set$ToggleSidebar(false);
      setCol(10);
      setZero('');
    } else {
      setShow("translatex-x-101");
      set$ToggleSidebar(true);
      setCol(12);
      setZero(0);
    }
  };
  return (
    <>
      <div className="">
        <div className={`sidebar-list scroll-y border-end blur ${show} `}>
          <SidebarInst toggleSidebar={toggleSidebar} />
        </div>
        <div className="row justify-content-end mx-0 ">
          <div className={`col-lg-${col} transition-all`}>
            <div className={`toggle-sidebar borders start-${zero}`}>
              <button onClick={toggleSidebar} type="button" className={`btn p-0`}>
                <i
                  className="fa-solid fa-bars fs-4 text-main"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
            <div className="row">
              <div className="col-12 p-0 border-bottom fixed-top z-1 ">
                <HeaderDashboard />
              </div>
              <div className="col-12 p-3 ps-5 mt-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
