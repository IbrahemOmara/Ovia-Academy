import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import InstructorLayout from "./Layouts/InstructorLayout";
import EventsLayout from "./Layouts/EventsLayout";
import Loading from "./components/Loading/Loading";
import SuccessPay from "./components/SuccessPay/SuccessPay";
import Admin from "./Layouts/Admin";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import StoreContextProvider from "./context/storeContext";
import ProtectedRoutesActive from "./ProtectedRoutes/ProtectedRoutesActive";
import ProtectedRoutesInstructor from "./ProtectedRoutes/ProtectedRoutesInstructor";
import Fx from "./components/Dashboard/Fx/Fx";
import Meetings from "./components/Meetings/Meetings";
import Contact from "./components/pages/Contact/Contact";
// import Services from "./components/pages/Services/Services";
import About from "./components/pages/About/About";
import Cart from "./components/Cart/Cart";
import Events from "./components/Dashboard/Events/Events";
import Tickect from "./components/Dashboard/Events/Tickect";
import Transfer from "./components/Dashboard/Transfer/Transfer";
import Check from "./components/Check/Check";
import LiveTradingNs from "./components/Dashboard/LiveTradingNs/LiveTradingNs";
import LiveTradingNNs from "./components/Dashboard/LiveTradingNNs/LiveTradingNNs";
import SignUpBalance from "./components/Dashboard/MyWallet/SignUpBalance";
import LiveCourseNs from "./components/Dashboard/Live/LiveCourseNs";
import LiveCourseNNs from "./components/Dashboard/Live/LiveCourseNNs";

import MyBusiness from "./components/Dashboard/MyBusiness/MyBusiness";
import TicketSupport from "./components/Dashboard/TicketSupport/TicketSupport";
import EnrollerTree from "./components/Dashboard/EnrollerTree/EnrollerTree";
import ViewCourseBunny from "./components/Dashboard/MyCourses/ViewCourseBunny";
// Bootstrap Carousel
import "bootstrap/dist/css/bootstrap.min.css";
import Courses from "./components/pages/Courses/Courses";
import CourseDetails from "./components/pages/Courses/CourseDetails";

const Home = React.lazy(() => import("./components/pages/Home/Home"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const ForgetPass = React.lazy(() =>
  import("./components/ForgetPass/ForgetPass")
);
const Packages = React.lazy(() => import("./components/Packages/Packages"));
const Pay = React.lazy(() => import("./components/Pay/Pay"));
const MainDashboard = React.lazy(() =>
  import("./components/Dashboard/MainDashboard/MainDashboard")
);
const MyWallet = React.lazy(() =>
  import("./components/Dashboard/MyWallet/MyWallet")
);
const HoldingTank = React.lazy(() =>
  import("./components/Dashboard/HoldingTank/HoldingTank")
);
const MyOrders = React.lazy(() =>
  import("./components/Dashboard/MyOrders/MyOrders")
);
const ViewOrder = React.lazy(() =>
  import("./components/Dashboard/MyOrders/ViewOrder")
);
const MyReports = React.lazy(() =>
  import("./components/Dashboard/MyReports/MyReports")
);
const University = React.lazy(() =>
  import("./components/Dashboard/University/University")
);
const Ewallet = React.lazy(() =>
  import("./components/Dashboard/Ewallet/Ewallet")
);
const MyCourses = React.lazy(() =>
  import("./components/Dashboard/MyCourses/MyCourses")
);
const ViewCourse = React.lazy(() =>
  import("./components/Dashboard/MyCourses/ViewCourse")
);
const Profile = React.lazy(() =>
  import("./components/Dashboard/Profile/Profile")
);
const RequestChecks = React.lazy(() =>
  import("./components/Dashboard/RequestChecks/RequestChecks")
);
const DashMeetings = React.lazy(() =>
  import("./components/Dashboard/DashMeetings/DashMeetings")
);
const DashMeetingsInAct = React.lazy(() =>
  import("./components/Dashboard/DashMeetings/DashMeetingsInAct")
);
const DashInstructor = React.lazy(() =>
  import("./components/DashboardInstructor/DashInstructor")
);
const MeetingInstructor = React.lazy(() =>
  import("./components/DashboardInstructor/MeetingInstructor/MeetingInstructor")
);

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        { path: "courses", element: <Courses /> },
        { path: "contact-us", element: <Contact /> },
        { path: "about-us", element: <About /> },
        { path: "check/:id", element: <Check /> },
        { path: "ticket/:id", element: <Tickect /> },
        { path: "courses/:id", element: <CourseDetails /> },
        // path="/courses/:id" element={<CourseDetails />}

        // {
        //   path: "meetings",
        //   element: (
        //     <ProtectedRoutes>
        //       <Meetings />
        //     </ProtectedRoutes>
        //   ),
        // },
        {
          path: "packages",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <Packages />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "pay/:toPrice",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <Pay />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "requestToken",
          element: (
            <ProtectedRoutes>
              <SignUpBalance />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-trading-nns",
          element: (
            <ProtectedRoutes>
              <LiveTradingNNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "pay-success",
          element: (
            <ProtectedRoutes>
              <SuccessPay />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          ),
        },
        {
          path: "sign-in",
          element: (
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          ),
        },
        {
          path: "sign-up",
          element: (
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "forget-password",
          element: (
            <Suspense fallback={<Loading />}>
              <ForgetPass />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/dashboard-user",
      element: (
        <ProtectedRoutes>
          <ProtectedRoutesActive>
            <Admin />
          </ProtectedRoutesActive>
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MainDashboard />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "main-dashboard",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MainDashboard />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-wallet",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MyWallet />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-tree",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <EnrollerTree />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-trading-ns",
          element: (
            <ProtectedRoutes>
              <LiveTradingNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-trading-nns",
          element: (
            <ProtectedRoutes>
              <LiveTradingNNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-course-ns",
          element: (
            <ProtectedRoutes>
              <LiveCourseNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-course-nns",
          element: (
            <ProtectedRoutes>
              <LiveCourseNNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "e-wallet",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <Ewallet />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "holding-tank",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <HoldingTank />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "events",
          element: (
            <ProtectedRoutes>
              <EventsLayout />
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true,
              element: (
                <ProtectedRoutes>
                  <Events />
                </ProtectedRoutes>
              ),
            },
            {
              path: "ticket/:id",
              element: (
                <ProtectedRoutes>
                  <Tickect />
                </ProtectedRoutes>
              ),
            },
          ],
        },
        {
          path: "my-business",
          element: (
            <ProtectedRoutes>
              <MyBusiness />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-checks",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <RequestChecks />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-reports",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MyReports />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-orders",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MyOrders />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-orders/view-order/:id",
          element: (
            <ProtectedRoutes>
              <ViewOrder />
            </ProtectedRoutes>
          ),
        },
        {
          path: "university",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <University />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-courses",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <MyCourses />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-courses/view-course/:id/:name",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                {/* <ViewCourse /> */}
                <ViewCourseBunny />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "meetings",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <DashMeetings />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "meetings",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <EnrollerTree />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "meetings-inActive",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <DashMeetingsInAct />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
       
        {
          path: "ticket-support",
          element: (
            <ProtectedRoutes>
              <TicketSupport />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-account",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            </ProtectedRoutes>
          ),
        },

        {
          path: "transfer",
          element: (
            <ProtectedRoutes>
              <Transfer />
            </ProtectedRoutes>
          ),
        },
      ],
    },

    {
      path: "/dashboard-instructor",
      element: (
        <ProtectedRoutes>
          <ProtectedRoutesInstructor>
            <InstructorLayout />
          </ProtectedRoutesInstructor>
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <DashInstructor />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/dashboard-instructor/main-dashboard",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <DashInstructor />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-trading-ns",
          element: (
            <ProtectedRoutes>
              <LiveTradingNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-trading-nns",
          element: (
            <ProtectedRoutes>
              <LiveTradingNNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-course-ns",
          element: (
            <ProtectedRoutes>
              <LiveCourseNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "live-course-nns",
          element: (
            <ProtectedRoutes>
              <LiveCourseNNs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-wallet",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <MyWallet />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "e-wallet",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <Ewallet />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },

        {
          path: "meetings",
          element: (
            <ProtectedRoutes>
              <MeetingInstructor />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-courses",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  {/* <MyCourses /> */}
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-courses/view-course/:id",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                {/* <ViewCourse /> */}
                <ViewCourseBunny />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-reports",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <MyReports />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-orders",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <MyOrders />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-orders/view-order/:id",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <ViewOrder />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "transfer",
          element: (
            <ProtectedRoutes>
              <Transfer />
            </ProtectedRoutes>
          ),
        },
        {
          path: "my-account",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Loading />}>
                <ProtectedRoutesInstructor>
                  <Profile />
                </ProtectedRoutesInstructor>
              </Suspense>
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="colored" style={{ zIndex: "99999999" }} />

      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}

export default App;
