import React, { useContext, useEffect, useState } from "react";
import "../../Dashboard/SideBar/SideBar.css";
import logo from "../../../assets/Ovia-logo/Ovia.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/storeContext";

export default function SidebarInst({ toggleSidebar }) {
  const [ns_balance, setNs_balance] = useState(
    JSON.parse(localStorage.dataAuth).ns_balance
  );
  const [active, setActive] = useState("");
  const { titlePageDashbourd, setTitlePageDashbourd } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.innerText === "Dashboard" || e.target.innerText === "Home") {
      e.target.innerText = "Main Dashboard";
      setActive("active");
    } else {
      setActive("");
    }
    setTitlePageDashbourd(e.target.innerText);
    toggleSidebar();
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/sign-in");
    window.location.reload();
  };

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setScreenSize({ width: window.innerWidth });
    if (screenSize.width >= 991.8) toggleSidebar();
  };

  useEffect(() => {
    handleResize();
    if (titlePageDashbourd === "Main Dashboard") {
      setActive("active");
    }
  }, []);

  return (
    <>
      <div className={`sidebar pt-3`} id="sidebar">
        <Link className="d-block ms-3" to="/">
          <div className="logo">
            <img src={logo} />
          </div>
        </Link>
        <div className="pages-dashboard">
          <ul className="navbar-nav mt-3">
            <li onClick={handleClick} className="nav-item">
              <NavLink
                className={`nav-link link-dashboard ${active}`}
                to="/dashboard-instructor/main-dashboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
                  ></path>
                </svg>
                <span className="d-md-block">Main Dashboard</span>
              </NavLink>
            </li>
            {/* live ns */}
            <li onClick={handleClick} className="nav-item">
              <NavLink
                className="nav-link link-dashboard "
                to="Live-trading-ns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m9.5 15.5l7-4.5l-7-4.5zM8 21v-2H4q-.825 0-1.412-.587T2 17V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v12q0 .825-.587 1.413T20 19h-4v2z"
                  />
                </svg>
                <span className=" d-md-block">Live Trading</span>
              </NavLink>
            </li>
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="meetings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.48 10.533a1.141 1.141 0 1 0 0-2.283a1.141 1.141 0 0 0 0 2.283m-2.055 2.946a2.06 2.06 0 0 1 .267-.993a2.077 2.077 0 0 1 1.788-1.045a2.077 2.077 0 0 1 1.787 1.045c.172.303.263.645.267.993m4.991-2.946a1.141 1.141 0 1 0 0-2.283a1.141 1.141 0 0 0 0 2.283M8.47 13.479a2.06 2.06 0 0 1 .267-.993a2.077 2.077 0 0 1 1.787-1.045a2.058 2.058 0 0 1 2.055 2.037m-5.58-9.431a1.065 1.065 0 1 0 0-2.13a1.065 1.065 0 0 0 0 2.13M5.008 6.718c.003-.337.092-.668.258-.962A2.013 2.013 0 0 1 7 4.743c.71.001 1.383.394 1.733 1.013c.166.294.255.625.259.962" />
                    <path d="M11.782.545H2.218a.718.718 0 0 0-.718.718V6c0 .397.322.718.718.718h9.564A.718.718 0 0 0 12.5 6V1.263a.718.718 0 0 0-.718-.718" />
                  </g>
                </svg>
                <span onClick={handleClick} className=" d-md-block">
                  Meeting
                </span>
              </NavLink>
            </li>
            <li hidden={!ns_balance} onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="my-wallet">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M489.972 119.059a23.839 23.839 0 0 0-17-7.059H456V72a24.027 24.027 0 0 0-24-24H86.627A70.628 70.628 0 0 0 16 118.627v274.746A70.628 70.628 0 0 0 86.627 464h385.4a24.047 24.047 0 0 0 24-23.923l.944-303.995a23.837 23.837 0 0 0-6.999-17.023M464.053 432H86.627A38.627 38.627 0 0 1 48 393.373V118.627A38.627 38.627 0 0 1 86.627 80H424v32H88v32h376.947Z"
                  ></path>
                  <path fill="currentColor" d="M392 264h32v32h-32z"></path>
                </svg>
                <span onClick={handleClick} className=" d-md-block">
                  {" "}
                  My Wallet
                </span>
              </NavLink>
            </li>
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="e-wallet">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.5 29.687c0-4.663 3.791-6.994 8.885-6.847l20.396-.147c4.663.294 7.236 2.674 7.719 7.141m-37-9.62c1.008-5.587 3.938-6.26 7.289-6.407h22.433c6.406.294 6.7 3.204 7.278 6.7"
                  ></path>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 5.5h33a2 2 0 0 1 2 2v33a2 2 0 0 1-2 2h-33a2 2 0 0 1-2-2v-33a2 2 0 0 1 2-2"
                  ></path>
                </svg>

                <span onClick={handleClick} className=" d-md-block">
                  {" "}
                  Ewallet Account History
                </span>
              </NavLink>
            </li>
            {/* my courses */}
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="my-courses">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M3.6 22.5c-1-2-1.6-4.2-1.6-6.5C2 8.3 8.3 2 16 2v2C9.4 4 4 9.4 4 16c0 2 .5 3.8 1.4 5.5zM28 16c0 6.6-5.4 12-12 12c-2.9 0-5.6-1-7.7-2.8l5.7-5.7l-1.4-1.5l-6.5 6.5c-.4.4-.4 1 0 1.4C8.7 28.5 12.3 30 16 30c7.7 0 14-6.3 14-14z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M18 25c-.1 0-.3 0-.4-.1c-.3-.1-.6-.4-.6-.8l-.7-5l2-.3l.4 3.3l2.2-1.7V15c0-.3.1-.5.3-.7l3.2-3.2c.9-.9 1.5-2.2 1.5-3.5V6h-1.5c-1.3 0-2.6.5-3.5 1.5l-3.2 3.2c-.2.2-.4.3-.7.3h-5.5l-1.7 2.2l3.3.4l-.3 2l-5-.7c-.4 0-.7-.3-.8-.6s-.1-.7.1-1l3-4c.3-.2.6-.3.9-.3h5.6l3-3c1.3-1.3 3.1-2 4.9-2H26c1.1 0 2 .9 2 2v1.5c0 1.9-.7 3.6-2 4.9l-3 3V21c0 .3-.1.6-.4.8l-4 3c-.2.1-.4.2-.6.2"
                  ></path>
                </svg>
                <span onClick={handleClick} className=" d-md-block">
                  My Courses
                </span>
              </NavLink>
            </li>
             {/* My Orders */}
             <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard" to="my-orders">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4 18V7.1L2.45 3.75q-.175-.375-.025-.763t.525-.562q.375-.175.763-.037t.562.512L6.2 7.05h11.6l1.925-4.15q.175-.375.563-.525t.762.05q.375.175.525.563t-.025.762L20 7.1V18q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m6-5h4q.425 0 .713-.288T15 12q0-.425-.288-.712T14 11h-4q-.425 0-.712.288T9 12q0 .425.288.713T10 13"
                  ></path>
                </svg>
                <span className="d-md-block">My Orders</span>
              </NavLink>
            </li>
            {/* Transfer */}
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="transfer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.944 3.25h4.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.678.678 1.015 1.522 1.19 2.55c.127.75.173 1.639.19 2.683a.754.754 0 0 1 .004.23c.003.286.005.584.006.894a.75.75 0 0 1-1.5.004v-.252H2.751c-.002.388-.002.804-.002 1.25c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h1.5a.75.75 0 0 1 0 1.5H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-.662 0-1.274.007-1.84a.757.757 0 0 1 .003-.23c.016-.907.053-1.69.143-2.363c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m-7.168 6h18.448c-.024-.715-.07-1.306-.154-1.808c-.143-.842-.387-1.355-.772-1.74c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.06.445-.094.952-.114 1.539m12.724 4a.75.75 0 0 1 .75.75v4.19l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l.72.72V14a.75.75 0 0 1 .75-.75m3.97.22a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72V20a.75.75 0 0 1-1.5 0v-4.19l-.72.72a.75.75 0 1 1-1.06-1.06zM5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="d-md-block">Transfer</span>
              </NavLink>
            </li>
            {/* My Reports */}
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard" to="my-reports">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    d="M3 1v22h13l5-5V1zm3 16h5m-5-4h12M6 9h10M3 5h18m0 12h-6v6"
                  ></path>
                </svg>
                <span className="d-md-block">My Reports</span>
              </NavLink>
            </li>
            {/* my profile  */}
            <li onClick={handleClick} className="nav-item">
              <NavLink className="nav-link link-dashboard " to="my-account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  ></path>
                </svg>
                <span className="d-md-block">My Profile</span>
              </NavLink>
            </li>
            {/* logout  */}
            <li className="nav-item">
              <button
                onClick={logOut}
                className="btn text-white mt-2 link-dashboard "
                to="/sign-in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399c-.277.277-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26c-.602-.602-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68z"
                  ></path>
                </svg>
                <span className="d-md-block">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
