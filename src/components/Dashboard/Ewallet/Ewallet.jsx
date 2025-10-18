import React, { useContext, useEffect, useState } from "react";
import "./Ewallet.css";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { format } from "date-fns";
import PopBankAccount from "./PopBankAccount/PopBankAccount";
import { StoreContext } from "../../../context/storeContext";
import { useNavigate } from "react-router-dom";
import RequestCash from "./RequestCash";
import PopEditBanckAcount from "./PopBankAccount/PopEditBankAcount";
import OTP from "./OTP/OTP";

export default function Ewallet() {
  const dataAuth = JSON.parse(localStorage.getItem("dataAuth"));
  const nameUser = dataAuth.name;
  const customerAttributeId = dataAuth.customerAttributeId;
  const navigate = useNavigate();

  const getUserDetails = (id) => {
    return axios.get(`${baseURL}/User/GetUserDetails?userId=${id}`);
  };

  const { data: userDetails } = useQuery(
    "getUserDetails",
    () => getUserDetails(customerAttributeId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    }
  );

  const GetBalanceHistory = (userId) => {
    return axios.get(
      `${baseURL}/BankController/GetBalanceHistory?CustomerAttributeId=${userId}`
    );
  };

  //get hold amount and total
  const getHoldAmoAndTotalAmo = (userId) => {
    return axios.get(
      `${baseURL}/User/Get_HoldAmount_and_TotalAmount?customerAttributeId=${userId}`
    );
  };

  const { data: amounts, isLoading: loadingAmounts } = useQuery(
    "getHoldAmoAndTotalAmo",
    () => getHoldAmoAndTotalAmo(customerAttributeId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  //hold and total
  const {
    data: balancesHistory,
    isLoading: balanceHisLoading,
    error: balanceHistErr,
  } = useQuery(
    "GetBalanceHistory",
    () => GetBalanceHistory(customerAttributeId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const { showPopUp, setShowPopUp } = useContext(StoreContext);
  const { togglePopUpBankWall, setTogglePopUpBankWall } =
    useContext(StoreContext);
  const _showPopUp = () => {
    if (togglePopUpBankWall) {
      setShowPopUp("d-block");
      setTogglePopUpBankWall(!togglePopUpBankWall);
    } else {
      setShowPopUp("d-none");
      setTogglePopUpBankWall(!togglePopUpBankWall);
    }
  };

  
  const {setConfirmOtpShow} = useContext(StoreContext);
  const showConfirmOtp = () => {
    setConfirmOtpShow('d-block');
    if (togglePopUpBankWall) {
      setShowPopUp("d-block");
      setTogglePopUpBankWall(!togglePopUpBankWall);
    } else {
      setShowPopUp("d-none");
      setTogglePopUpBankWall(!togglePopUpBankWall);
    }
  };


  const myChecks = () => {
    navigate("/dashboard-user/my-checks");
  };

  if (
    // loading ||
    // loadingLastBal ||
    balanceHisLoading ||
    loadingAmounts
  )
    return <Loading />;
  return (
    <>
      <section className="e-wallet mt-4 " id="eWallet">
        <div className=" container p-0 py-3">
          <div className="actions">
            <div className="d-flex gap-2 gap-md-4 justify-content-end align-items-end flex-column flex-sm-row ">
              <div className="bank-account">
                {userDetails?.data.isApproved_BinanceAccount ? (
                  <PopEditBanckAcount />
                ) : userDetails?.data.binance_Account ? (
                  <button
                    onClick={showConfirmOtp}
                    type="button"
                    className="btn bg-grdient"
                  >
                    Confirme Bank Account
                  </button>
                ) : (
                  <button
                    onClick={_showPopUp}
                    type="button"
                    className="btn bg-grdient"
                  >
                    Bank Accounts
                  </button>
                )}
              </div>
              <div className="checks">
                <button
                  onClick={myChecks}
                  type="button"
                  className="btn bg-grdient"
                >
                  Checks
                </button>
              </div>
              <RequestCash customerAttributeId={customerAttributeId} />
            </div>
          </div>
          <div className={`container-pop-up-bank mt-5 ${showPopUp}`}>
            <div className="popUp-bank">
              <PopBankAccount />
            </div>
          </div>
          <div className="data mt-5">
            <div className="row gy-4">
              <div className="col-sm-6 col-md-3">
                <div className="card-data">
                  <label>Name</label>
                  <p>{nameUser}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card-data card-data2">
                  <label>Hold Amount</label>
                  <p>${amounts?.data.holdAmount}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card-data card-data4">
                  <label>Available Amount</label>
                  <p>${amounts?.data.holdAmount}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card-data card-data3">
                  <label>Total Amount</label>
                  <p>${amounts?.data.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive rounded-3 mt-5">
            <table className="table text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="card-data card-data5 rounded-0 ps-3"
                  >
                    Hold Amount
                  </th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Release Date</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className=" fw-bolder text-center border">
                  <td>${amounts?.data.holdAmount}</td>
                  <td>
                    {amounts
                      ? format(new Date(amounts?.data.from), "MMM d, y h:m a")
                      : ""}
                  </td>
                  <td>
                    {amounts
                      ? format(new Date(amounts?.data.to), "MMM d, y h:m a")
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive rounded-3 mt-5">
            <table className="table table-hover table text-center">
              <thead>
                <tr>
                  <th scope="col" className="flex-shrink-0">
                    Global Date
                  </th>
                  <th scope="col">Type</th>
                  <th scope="col">Global Description</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody className="">
                {balancesHistory?.data.map((balance) => {
                  return (
                    <tr className="" key={balance.id}>
                      <td className="">
                        {balance
                          ? format(
                              new Date(balance.transactionDate),
                              "MMM d, y h:m a"
                            )
                          : ""}
                      </td>
                      <td>Adjust</td>
                      <td>{balance.description}</td>
                      <td>{balance.debit}</td>
                      <td>{balance.credit}</td>
                      <td>{balance.balance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <h2 className=""> {balanceHistErr?.response.data}</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
