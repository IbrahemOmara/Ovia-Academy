import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { StoreContext } from "../../../context/storeContext";
import { toast } from "react-toastify";

export default function PopUpEditDataUser({ refetchDataUser,dataUser }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editDataUserFun = (values) => {
    axios
      .put(`${baseURL}/User/EditUserData`, values)
      .then((data) => {
        // console.log(data);
        refetchDataUser();
        toast.success("Edit Data User Success");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("You have a problem");
      });
  };

  const editDataUser = useFormik({
    initialValues: {
      userId: dataUser?.data.id,
      mobileNumber: dataUser?.data.mobile,
      whatsAppNumber: dataUser?.data.whatsappmobile,
      email: dataUser?.data.email,
    },
    onSubmit: (values) => {
      console.log(values);
      editDataUserFun(values);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="text-black text-capitalize fw-bold border-0 "
        onClick={handleClickOpen}
      >
        Edite
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="bg-main-color ">
          Edite your information
        </DialogTitle>
        <DialogContent
          className="bg-main-color"
          style={{ width: "clamp(340px,50vw,500px)" }}
        >
          <form
            onChange={editDataUser.handleChange}
            onSubmit={editDataUser.handleSubmit}
            className=""
          >
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={editDataUser.handleChange}
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  name="mobileNumber"
                  value={editDataUser.values.mobileNumber}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={editDataUser.handleChange}
                  type="tel"
                  className="form-control"
                  placeholder="WhatsApp Number"
                  name="whatsAppNumber"
                  value={editDataUser.values.whatsAppNumber}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <input
                  required
                  onChange={editDataUser.handleChange}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={editDataUser.values.email}
                />
              </div>
            </div>
            <DialogActions className="bg-main-color mt-4 pt-3 border-top">
              <Button className="" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
