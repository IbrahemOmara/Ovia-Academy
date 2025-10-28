import React, { useEffect, useState } from "react";
import "./MyWallet.css";
import axios from "axios";
import { format } from "date-fns";
import { useFormik } from "formik";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import { useQuery } from "react-query";

export default function SignUpBalance() {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.dataAuth).customerAttributeId
  );
  const [balance, setBalance] = useState({});
  const [paid, setPaid] = useState([]);
  const [unPaid, setUnPaid] = useState([]);
  const [totalPriceUnPaid, setTotalPriceUnPaid] = useState([]);
  const [totalPricePaid, setTotalPricePaid] = useState([]);

  async function getSignupAccountBalance(id) {
    await axios
      .get(`${baseURL}/BankController/GetSignupAccountBalance?userId=${id}`)
      .then(({ data }) => {
        // console.log(data);
        typeof data === "string"
          ? setBalance({ balance: 0 })
          : setBalance(data);
      })
      .catch((error) => {
        setBalance({ balance: 0 });
        toast.warning("You dont have any balance");
      });
  }

  function requestToken(values) {
    axios
      .post(`${baseURL}/User/RequestTokenFromSignUpBalance`, values)
      .then(({ data }) => {
        if (typeof data === "string") {
          setCode(data);
        } else {
          getSignupAccountBalance(userId);
          setCode(data.token);
        }
      })
      .catch((error) => {
        setCode("You dont have balance");
        toast.error("You dont have balance");
      });
  }

  async function getUserTokens(id) {
    return axios.get(`${baseURL}/User/GetUserTokens?userId=${id}`);
  }

  const {
    data: tokens,
    isLoading,
    refetch,
  } = useQuery("getUserTokens", () => getUserTokens(userId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const calcSumTotPricePaid = () => {
    let sum = 0;
    paid?.forEach((token) => {
      sum += token.value;
    });
    setTotalPricePaid(sum);
  };

  const calcSumTotPriceUnPaid = () => {
    let sum = 0;
    unPaid?.forEach((token) => {
      sum += token.value;
    });
    setTotalPriceUnPaid(sum);
  };

  let $requestToken = useFormik({
    initialValues: {
      userId: "",
      tokenValue: "",
    },
    onSubmit: (values) => {
      values.userId = userId;
      requestToken(values);
    },
  });

  let paidTokens;
  let unpaidTokens;
  const paidAndUnPaid = () => {
    setPaid(paidTokens);
    setUnPaid(unpaidTokens);
    calcSumTotPricePaid();
    calcSumTotPriceUnPaid();
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.dataAuth).customerAttributeId;
    setUserId(id);
    getSignupAccountBalance(id);
    getUserTokens(id);

    refetch();
    if (typeof tokens?.data !== "string") {
      paidTokens = tokens?.data.filter((token) => token.isUsed);
      unpaidTokens = tokens?.data.filter((token) => !token.isUsed);
      paidAndUnPaid();
    }
  }, [tokens]);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="my-wallet mt-5 pt-5" id="my-wallet">
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-12">
              <div className="point-remain bg-grdient p-3 rounded-3 d-flex justify-content-between align-align-items-center ">
                <p className="fs-5 fw-bold m-0">Point Remaining</p>
                <p className="fs-5 fw-bold m-0">
                  {balance.balance ? balance.balance : "0 "}
                  <span> Point</span>
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={$requestToken.handleSubmit} className="mt-5">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="point-request">
                  <label
                    htmlFor="tokenValue"
                    className="form-label  my-fw-bold"
                  >
                    Piont Request
                  </label>
                  <select
                    onChange={$requestToken.handleChange}
                    name="tokenValue"
                    className="form-select select-piont py-2"
                    aria-label="Default select example"
                    id="tokenValue"
                  >
                    <option defaultValue>Select Piont</option>
                    <option value="3">3</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="130">130</option>
                    <option value="180">180</option>
                    <option value="330">330</option>
                    <option value="630">630</option>
                    <option value="930">930</option>
                    <option value="1230">1230</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4 mt-4 pt-2 ">
                <button type="submit" className="btn bg-grdient py-2 border-0">
                  Request Points
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-8">
                <h6 className="fw-bold fs-5 ">Code</h6>
                <div className="show-code border p-2 rounded-3 text-white-50 ">
                  {code}
                </div>
              </div>
            </div>
          </form>

          <div className="show-tokens mt-5">
            <ul
              className="nav nav-tabs justify-content-between border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item " role="presentation">
                <button
                  className="nav-link active paid-btn btn p-0"
                  id="unPaid-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#unPaid-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="unPaid-tab-pane"
                  aria-selected="true"
                >
                  Un Paid
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link btn p-0 paid-btn"
                  id="paid-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#paid-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="paid-tab-pane"
                  aria-selected="false"
                >
                  Paid
                </button>
              </li>
            </ul>
            <div className="tab-content mt-4" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="unPaid-tab-pane"
                role="tabpanel"
                aria-labelledby="unPaid-tab"
                tabIndex={0}
              >
                <h6 className="my-fw-bold ">
                  Total Price : {totalPriceUnPaid || 0}
                </h6>
                <div className="table-responsive show-history-piont rounded-3 ">
                  <table className="table  text-center fw-bold">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Token</th>
                        <th scope="col">Price</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokens != "You dont have any tokens" ? (
                        unPaid
                          ?.slice()
                          .reverse()
                          .map((item, index = 0) => {
                            return (
                              <tr
                                className={`${
                                  item.isUsed ? "table-danger" : "table-success"
                                }`}
                                key={index + 1}
                              >
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <span> {item.token} </span>
                                </td>
                                <td>
                                  <span>{item.value}</span> $
                                </td>
                                <td>
                                  <span>
                                    {format(
                                      new Date(item.createdDate),
                                      "MMM d, y h:m a"
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr className="text-center mt-3  position-absolute start-50">
                          {tokens}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="paid-tab-pane"
                role="tabpanel"
                aria-labelledby="paid-tab"
                tabIndex={0}
              >
                <h6 className="my-fw-bold ">
                  Total Price : {totalPricePaid || 0}
                </h6>
                <div className="table-responsive show-history-piont rounded-3 ">
                  <table className="table  text-center fw-bold">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Token</th>
                        <th scope="col">Price</th>
                        <th scope="col">Paid By</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokens != "You dont have any tokens" ? (
                        paid
                          ?.slice()
                          .reverse()
                          .map((item, index = 0) => {
                            return (
                              <tr
                                className={`${
                                  item.isUsed ? "table-danger" : "table-success"
                                }`}
                                key={index + 1}
                              >
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <span> {item.token} </span>
                                </td>
                                <td>
                                  <span>{item.value}</span> $
                                </td>
                                <td>
                                  <span>{item.paidby}</span>
                                </td>
                                <td>
                                  <span>
                                    {format(
                                      new Date(item.createdDate),
                                      "MMM d, y h:m a"
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr className="text-center mt-3  position-absolute start-50">
                          {tokens}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
