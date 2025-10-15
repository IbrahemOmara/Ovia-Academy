import React, { useEffect, useState } from "react";
import BtnLoading from "../../BtnLoading/BtnLoading";
import { toast } from "react-toastify";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";

export default function RequestCash({ customerAttributeId }) {
  const [activeDay, setActiveDay] = useState(false);
  const [btnLoadingReCash, setBtnLoadingReCash] = useState(false);
  const binance_account = JSON.parse(localStorage.dataAuth).binance_account;
  const getBalance = (userId) => {
    return axios.get(`${baseURL}/BankController/GetBalance?userId=${userId}`);
  };
  const { data: lastBalance, isLoading: loadingLastBal } = useQuery(
    "getBalance",
    () => getBalance(customerAttributeId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const RequestCash = async (balanceId) => {
    setBtnLoadingReCash(true);
    await axios
      .get(`${baseURL}/BankController/RequestCash?balanceId=${balanceId}`)
      .then((res) => {
        toast.success("Successfully requested cash!");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    setBtnLoadingReCash(false);
  };

  //request cash
  const requestCash = async () => {
    if (lastBalance?.data.id) {
      await RequestCash(lastBalance?.data.id);
      window.location.reload();
    } else {
      toast.error("No balance found!");
    }
  };

  //detect day name for current date
  const detectDayName = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    const dayIndex = date.getDay();
    const name = days[dayIndex];
    return name;
  };

  const [today, setToday] = useState(detectDayName());

  const getDaysCashBack = () => {
    return axios.get(`${baseURL}/Cashbackvisability/GetAll`);
  };

  const { data: days } = useQuery("daysCashBack", getDaysCashBack, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (days) {
      for (const day of days?.data) {
        if (day.isActive === true && today === day.day) {
          setActiveDay(true);
        }
      }
    }
  }, [days]);

  return (
    <>
      <div className="transfer">
        <button
          disabled={!activeDay || !binance_account}
          onClick={requestCash}
          type="button"
          className="btn bg-grdient"
        >
          {btnLoadingReCash ? <BtnLoading /> : "Request Cash"}
        </button>
      </div>
    </>
  );
}
