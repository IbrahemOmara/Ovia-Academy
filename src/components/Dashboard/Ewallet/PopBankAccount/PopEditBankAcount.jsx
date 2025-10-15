import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../../utils/baseURL";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function PopEditBanckAcount({ refetchAllTrainng }) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("dataAuth")).customerAttributeId
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBinanceAccount = (id) => {
    return axios.get(
      `${baseURL}/CustomerInfo/GetBinanceAccount?customerId=${id}`
    );
  };

  const { data: binanceAccount, isLoading: loadingBinanceAccount ,refetch} = useQuery(
    "getBinanceAccount",
    () => getBinanceAccount(userId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    }
  );

//   console.log(binanceAccount);

  const editBinanceAccount = (values) => {
    axios
      .put(
        `${baseURL}/CustomerInfo/EditBinanceAccount?customerId=${values.customerId}&&accountNumber=${values.accountNumber}`
      )
      .then(({ data }) => {
        console.log(data);
        toast.success(data);
        refetch();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data||'problem')
      });
  };

  const editBankAccount = useFormik({
    initialValues: {
      accountNumber: "",
      customerId: userId,
    },
    onSubmit: (values) => {
      console.log(values);
      editBinanceAccount(values);
    },
  });

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className="bg-grdient text-capitalize fw-bold border-0 "
        onClick={handleClickOpen}
      >
        Edit Banck Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="bg-main-color text-white">
          Banck Account
        </DialogTitle>
        <DialogContent
          className="bg-main-color"
          // style={{ width: "clamp(340px,50vw,1000px)" }}
        >
          <div className="row gy-3 shadow border border-secondary py-2 mt-3">
            <h4 className="text-white m-0">National ID</h4>
            <div className="col-md-6 ">
              <div className="h-100">
                <h5 className="text-white">Front</h5>
                <div className="container-img">
                  <img src={binanceAccount?.data.frontIdImageUrl} alt="front" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="">
                <h5 className="text-white">Back</h5>
                <img src={binanceAccount?.data.backIdImageUrl} alt="front" />
              </div>
            </div>
          </div>

          <div className="row gy-3 shadow border border-secondary py-2 mt-3">
            <div className="col-12 ">
              <div className="d-flex gap-2">
                <h4 className="text-white m-0">Binance Number:</h4>
                <h4 className="my-fw-bold text-white">
                  {binanceAccount?.data.binanceNumber}
                </h4>
              </div>
            </div>
          </div>

          <form
            onChange={editBankAccount.handleChange}
            onSubmit={editBankAccount.handleSubmit}
            className="mt-4"
          >
            <h5 className="text-white">If you edit your binance number</h5>
            <div className="row">
              <div className="col-12">
                <input
                  required
                  onChange={editBankAccount.handleChange}
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  placeholder="Enter New Binance Number"
                />
              </div>
            </div>
            <DialogActions className="bg-main-color mt-4 pt-3 border-top">
              <Button className="text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="text-white" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
