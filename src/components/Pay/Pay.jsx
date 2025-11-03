import React, { useEffect, useState } from "react";
import "./Pay.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { baseURL } from "../../utils/baseURL";
import BtnLoading from "../BtnLoading/BtnLoading";
import { toast } from "react-toastify";

export default function Pay() {
  const prams = useParams();
  // console.log(prams.toPrice);
  const [price, setPrice] = useState(prams.toPrice - "0");
  const [allTokens, setAllTokens] = useState([]);
  const [btnAddLoading, setBtnAddLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [tokenValue, setTokenValue] = useState(0);
  const [notAllow, setNotAllow] = useState("not-allowed");
  let navigate = useNavigate();
  const [notValidToken, setNotValidToken] = useState("d-none");

  async function CheckTokenStatus(token) {
    try {
      const response = await axios.get(
        `${baseURL}/User/CheckTokenStatus?tokenNumber=${token}`
      );
      const { data } = response;

      if (data.isUsed !== false) {
        setNotAllow("not-allowed");
        setNotValidToken("d-block");
        toast.error("Token not Valid");
        return { isValid: false };
      } else {
        setNotAllow("");
        setNotValidToken("d-none");
        toast.success("Ok Valid Token");
        return { isValid: true, value: data.value };
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return { isValid: false, error: error.response.data };
    }
  }

  function buyPackages(values) {
    axios
      .post(`${baseURL}/User/BuyPackages`, values)
      .then(({ data }) => {
        navigate("/pay-success");
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  let token = useFormik({
    initialValues: {
      tokens: allTokens,
      packagesIds: [],
      customerAttributeId: 0,
    },
    onSubmit: (values) => {
      const pkgIds = JSON.parse(localStorage.getItem("cart_packages"));
      values.packagesIds = pkgIds.map((pkg) => {
        return pkg.id;
      });

      values.tokens = allTokens.map((tkn) => {
        return tkn.token;
      });

      values.customerAttributeId = JSON.parse(
        localStorage.dataAuth
      ).customerAttributeId;

      buyPackages(values);
    },
  });

  const addTokens = async (token) => {
    setBtnAddLoading(true);

    if (token) {
      const foundTkn = allTokens.find((tkn) => tkn.token === token);
      if (!foundTkn) {
        const isValidToken = await CheckTokenStatus(token);

        if (isValidToken.isValid) {
          setAllTokens([
            ...allTokens,
            { token: token, value: isValidToken.value },
          ]);
          setPrice(price - isValidToken.value);
          console.log(price - isValidToken.value);
          if (!(price - isValidToken.value)) {
            setStatus(true);
          }
        }
      } else {
        toast.error("Token already added");
      }
    } else {
      toast.error("Enter valid token");
    }

    setBtnAddLoading(false);
  };

  const removeTokens = async (token) => {
    setAllTokens(allTokens.filter((t) => t.token !== token.token));
    setPrice(price + token.value);
    console.log(price);
    if (!price) {
      setStatus(true);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="pay" id="pay">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 col-lg-5 m-auto ">
              <div className="box-pay ">
                <div className="head-pay d-flex align-items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.5em"
                    height="2.5em"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      fill="currentColor"
                      d="M1888 256q33 0 62 12t51 35t34 51t13 62v1088q0 33-12 62t-35 51t-51 34t-62 13H160q-33 0-62-12t-51-35t-34-51t-13-62V416q0-33 12-62t35-51t51-34t62-13zM160 384q-14 0-23 9t-9 23v224h1792V416q0-14-9-23t-23-9zm1728 1152q14 0 23-9t9-23V768H128v736q0 14 9 23t23 9zm-480-384h256v128h-256z"
                    ></path>
                  </svg>
                  <h1 className="text-main-2 my-fw-bold text-center">
                    Pay by Token
                  </h1>
                </div>
                <form onSubmit={token.handleSubmit}>
                  <div className="row mt-4">
                    <div className="col-12">
                      <h5 className="fw-bold">Total of the Order</h5>
                      <div className="total-ordar border rounded-2 ps-2 py-2 fw-bold">
                        ${prams.toPrice}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="token">
                        <label
                          htmlFor="token"
                          className="form-label fs-5 fw-bold"
                        >
                          Token
                        </label>
                        <div className="position-relative">
                          <input
                            onChange={token.handleChange}
                            type="text"
                            className="form-control my-input py-2 border-0"
                            name="tokens"
                            id="tokens"
                            placeholder=""
                          />
                          {/* <div
                            className={`${notValidToken} alert alert-danger p-1 fs-small mt-2 w-75`}
                            role="alert"
                          >
                            Please enter valid Token
                          </div> */}
                          <button
                            disabled={btnAddLoading}
                            type="button"
                            onClick={() => addTokens(token.values.tokens)}
                            className="btn text-white bg-main-color-3 position-absolute end-0 top-0 h-100 "
                          >
                            {btnAddLoading ? (
                              <BtnLoading />
                            ) : (
                              <i className="fa-solid fa-plus"></i>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      {/* <h5 className='fw-bold'>Total of the Order</h5> */}
                      {allTokens.length ? (
                        <div className=" border rounded-2 ps-2 py-2 fw-bold d-flex gap-3 flex-wrap">
                          {allTokens.map((token) => {
                            return (
                              <div className=" d-flex gap-2" key={token.token}>
                                <p className="m-0">{token.token}</p>
                                <button
                                  onClick={() => removeTokens(token)}
                                  className="btn p-0 text-danger"
                                >
                                  <i className="fa-solid fa-close"></i>{" "}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12">
                      <div className=" border rounded-2 ps-2 py-2 fw-bold d-flex gap-3 flex-wrap mt-2">
                        <p className="fw-medium m-0 text-just">Your Tokens value : <span className="fw-bold">{(prams.toPrice - "0")-price}</span></p>
                        <p className="fw-medium m-0 text-just">Remaining value : <span className="fw-bold">{price}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className={`button-pay ${notAllow}`}>
                        <button
                          disabled={!status}
                          type="submit"
                          className={`w-100 btn btn-pay fw-bolder fs-5 `}
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}