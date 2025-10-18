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
import { Avatar, DialogContentText } from "@mui/material";
import { format } from "date-fns";

export default function ReportToken() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reportAboutToken = (token) => {
    axios
      .get(`${baseURL}/User/SearchAboutToken?tokenNumber=${token.tokenNumber}`)
      .then((res) => {
        // console.log(res);
        setToken([res.data]);
      })
      .catch((error) => {
        // console.log(error);
        setToken([]);
        error.response.data==='Token not used before'?toast.info(error.response.data):toast.error(error.response.data);
      });
  };

  const searchToken = useFormik({
    initialValues: {
      tokenNumber: "",
    },
    onSubmit: (values) => {
      //   console.log(values);
      reportAboutToken(values);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="bg-grdient text-capitalize fw-bold border-0 "
        onClick={handleClickOpen}
      >
        Report Token
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="bg-main-color ">
          Report about token!
        </DialogTitle>
        <DialogContent
          className="bg-main-color"
          style={{ width: "clamp(340px,50vw,500px)" }}
        >
          <form
            onChange={searchToken.handleChange}
            onSubmit={searchToken.handleSubmit}
            className=""
          >
            <div className="row mt-4">
              <div className="col-12">
                <div className="position-relative">
                  <input
                    required
                    onChange={searchToken.handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Token"
                    name="tokenNumber"
                  />
                  <button
                    type="submit"
                    className="bg-grdient position-absolute end-0 top-0 h-100 p-2 border border-1"
                  >
                    <i className="fa-solid fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {token?.map((token) => (
            <DialogContentText className="mt-4" key={token}>
              <div className="box-report bg-body rounded-3 overflow-hidden px-3">
                {token.isUsed ? (
                  <div className="">
                    <div className="border-bottom py-2 d-flex justify-content-between">
                      <label className="m-auto fw-bold text-danger">Used</label>
                    </div>
                    <div
                      className="rounded-circle shadow overflow-hidden m-auto mt-2"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <Avatar
                        sx={{ width: 100, height: 100, background: "" }}
                        alt={token.imgUrl}
                        src={token.imgUrl}
                      />
                    </div>
                    <div className="desc-profile my-fw-bold mt-3 mb-3">
                      <div className="border-bottom pb-4 d-flex justify-content-center">
                        {/* <label className="text-black">Paid by</label> */}
                        <span>{token?.paidby}</span>
                      </div>
                      <div className="border-bottom py-2 d-flex justify-content-between mt-4">
                        <label className="text-black">ID</label>
                        <span>{token?.backOfficeId}</span>
                      </div>
                      <div className="border-bottom py-2 d-flex justify-content-between">
                        <label className="text-black">Price</label>
                        <span>{token?.value}</span>
                      </div>
                      <div className="border-bottom py-2 d-flex justify-content-between">
                        <label className="text-black">Paid Date</label>
                        <>
                          {token?.paidDate
                            ? format(new Date(token.paidDate), "MMM d, y h:m a")
                            : ""}
                        </>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="border-bottom py-2 d-flex justify-content-between">
                      <label className="m-auto fw-bold text-success">
                        Not Used
                      </label>
                    </div>
                    <div className="border-bottom py-2 d-flex justify-content-between">
                      <label className="text-black fw-bold">
                        Creation Date
                      </label>
                      <>
                        {token?.createdDate
                          ? format(
                              new Date(token.createdDate),
                              "MMM d, y h:m a"
                            )
                          : ""}
                      </>
                    </div>
                    <div className="border-bottom py-2 d-flex justify-content-between">
                      <label className="text-black fw-bold">Price</label>
                      <span>{token?.value}</span>
                    </div>
                  </div>
                )}
              </div>
            </DialogContentText>
          ))}

          <DialogActions className="bg-main-color mt-4 pt-3 border-top">
            <Button className="" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
