import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../utils/baseURL";
import { StoreContext } from "../../../context/storeContext";
import { CiclePlus } from "../../MyIcon/CirclePlus";
import { useQuery } from "react-query";
import BtnLoading from "../../BtnLoading/BtnLoading";

export default function PopFormCreateMeetingInst({ refetchAllTrainng,nameRoom }) {
  const { setNewMeeting } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));
  const urlMeeting = `https://livezoon.com/join?room=${nameRoom}&roomPassword=false&name=${dataUser.name}&username=admin&audio=true&video=false&screen=false&notify=false&admin=1&&origin=ncomes.network&priamry_color=223f4a`;

  const getInstructorCourses = (id) => {
    return axios.get(
      `${baseURL}/Admin/GetInstructorCourses?InstructorId=${id}`
    );
  };

  const {
    data: coursesInst,
    error: errCoursesInst,
    isLoading: courserInstLoading,
  } = useQuery(
    "getInstructorCourses",
    () => getInstructorCourses(dataUser.customerAttributeId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    }
  );

  console.log(coursesInst, errCoursesInst);

  const createLiveCourse = (values) => {
    axios
      .post(`${baseURL}/User/CreateLiveCourseMeeting`, values)
      .then(({ data }) => {
        console.log(data);
        setNewMeeting(data);
        toast.success("Create meeting success!");
        handleClose();
        refetchAllTrainng();
      })
      .catch((err) => {
        toast.error("You have problem!");
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createMeeting = useFormik({
    initialValues: {
      courseId: 0,
      instructorId: dataUser.customerAttributeId,
      lectureLiveName: "",
      date: "",
      time: "",
      url: "",
      // roomName:"",
    },
    onSubmit: () => {
      createMeeting.values.date =
        createMeeting.values.date + "T" + createMeeting.values.time;
      delete createMeeting.values.time;
      createMeeting.values.url = urlMeeting;
      console.log(createMeeting.values);
      createLiveCourse(createMeeting.values);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="my-btn mt-2 bg-main-color-3 text-capitalize fw-bold border-0"
        onClick={handleClickOpen}
      >
        <CiclePlus style={{ fontSize: "1.1rem", marginRight: "5px" }} /> New
        Meeting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="bg-main-color text-white">
          Create Meeting
        </DialogTitle>
        <DialogContent
          className="bg-main-color"
          style={{ width: "clamp(340px,50vw,500px)" }}
        >
          <form
            onChange={createMeeting.handleChange}
            onSubmit={createMeeting.handleSubmit}
            className=""
          >
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={createMeeting.handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Lecture Name"
                  name="lectureLiveName"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <select
                  onChange={createMeeting.handleChange}
                  className="form-select bg-main-color text-white"
                  name="courseId"
                  required
                >
                  {coursesInst ? (
                    <div className="">
                      <option defaultValue>Select Course ID</option>
                      {coursesInst.data.map((course) => {
                        return (
                          <option value={course.id}>{course.nameEn}</option>
                        );
                      })}
                    </div>
                  ) : courserInstLoading ? (
                    <BtnLoading />
                  ) : (
                    <option className="text-danger bg-danger">
                      {errCoursesInst?.response.data}
                    </option>
                  )}
                </select>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={createMeeting.handleChange}
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  name="date"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={createMeeting.handleChange}
                  type="time"
                  className="form-control"
                  name="time"
                />
              </div>
            </div>
            <DialogActions className="bg-main-color mt-4 pt-3 border-top">
              <Button className="text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="text-white" type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
