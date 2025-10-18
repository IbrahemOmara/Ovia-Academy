import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import BtnLoading from "../../BtnLoading/BtnLoading";

export default function Transfer() {
  const dataUser = JSON.parse(localStorage.dataAuth);
  const [btnLoading, setBtnLoading] = useState(false);

  const transferMoney = async (values) => {
    await axios
      .post(`${baseURL}/BankController/TransferMoney`, values)
      .then((res) => {
        toast.success(res.data);
        setBtnLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setBtnLoading(false);
      });
  };

  const transfer = useFormik({
    initialValues: {
      amount: 0,
      senderBackOfficeId: dataUser?.referId,
      recieverBackOfficeId: "",
    },
    onSubmit: (values) => {
      setBtnLoading(true);
      transferMoney(values);
    },
  });

  return (
    <>
      <section className="transfer">
        <div className="container">
          <form
            onChange={transfer.handleChange}
            onSubmit={transfer.handleSubmit}
          >
            <div className="row mt-3 ">
              <div className="col-10">
                <div className="form-group">
                  <label
                    htmlFor="senderBackOfficeId"
                    className="form-label  my-fw-bold"
                  >
                    From Account
                  </label>
                  <select
                    onChange={transfer.handleChange}
                    className="form-select form-select-1 "
                    name="senderBackOfficeId"
                    id="senderBackOfficeId"
                    style={{color:"#1a8755", border:"solid 1px #1a8755"}}
                  >
                    <option value={dataUser?.referId} selected>
                      {dataUser?.referId}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-10">
                <div className="form-group">
                  <label
                    htmlFor="recieverBackOfficeId"
                    className="form-label  my-fw-bold"
                  >
                    To Account
                  </label>
                  <input
                    onChange={transfer.handleChange}
                    className="form-control"
                    type="text"
                    name="recieverBackOfficeId"
                    id="recieverBackOfficeId"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-10">
                <div className="form-group">
                  <label
                    htmlFor="amount"
                    className="form-label  my-fw-bold"
                  >
                    Amount (must be equal to or more than $15)
                  </label>
                  <input
                    onChange={transfer.handleChange}
                    className="form-control"
                    type="number"
                    name="amount"
                    id="amount"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3 justify-content-center">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn bg-grdient d-block w-75 m-auto"
                >
                  {
                    btnLoading?<BtnLoading/>:'Transfer'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
