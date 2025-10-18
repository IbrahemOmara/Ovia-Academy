import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CiclePlus } from "../../MyIcon/CirclePlus";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { StoreContext } from "../../../context/storeContext";
import { toast } from "react-toastify";
import BtnLoading from "../../BtnLoading/BtnLoading";

export default function PopFromCreateMeeting({ refetchAllTrainng }) {
  const { setNewMeeting } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));
  const [btnLoading, setBtnLoading] = useState(false);

  const prepairUrlMeeting = (roomName) => {
    const urlMeeting =`https://livezoon.com/join?room=${roomName}&roomPassword=false&name=admin&username=admin&audio=true&video=false&screen=false&notify=false&admin=1&&origin=ncomes.network&priamry_color=#223f4a`;
    return urlMeeting;
  };

  const createTrainning = (values) => {
    axios
      .post(`${baseURL}/User/CreateTrainning`, values)
      .then(({ data }) => {
        console.log(data);
        data.url = prepairUrlMeeting(values.trainningName);
        setNewMeeting(data);
        toast.success("Create meeting success!");
        handleClose();
        refetchAllTrainng();
        setBtnLoading(false);
      })
      .catch((err) => {
        toast.error("You have problem!");
        console.log(err);
        setBtnLoading(false);
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
      trainningName: "",
      date: "",
      time: "",
      createdBy: dataUser.customerAttributeId,
    },
    onSubmit: () => {
      createMeeting.values.date =
        createMeeting.values.date + "T" + createMeeting.values.time;
      delete createMeeting.values.time;
      console.log(createMeeting.values);
      setBtnLoading(true);
      createTrainning(createMeeting.values);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="my-btn mt-2 bg-main-color-3 text-capitalize fw-bold border-0 "
        onClick={handleClickOpen}
      >
        <CiclePlus style={{ fontSize: "1.1rem", marginRight: "5px" }} /> New
        Meeting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="bg-main-color ">
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
                  placeholder="Trainging Name"
                  name="trainningName"
                />
              </div>
            </div>
            {/* <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={createMeeting.handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Room Name"
                  name="roomName"
                />
              </div>
            </div> */}
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
              <Button className="" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                disabled={btnLoading}
                className=""
                type="submit"
              >
                {btnLoading ? <BtnLoading /> : "Create"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
