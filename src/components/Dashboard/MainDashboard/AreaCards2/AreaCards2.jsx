import React from "react";
import AreaCard from "../AreaCard/AreaCard";
import "../AreaCards/AreaCards.css";
import { baseURL } from "../../../../utils/baseURL";
import axios from "axios";
import { useQuery } from "react-query";

export default function AreaCards2() {
  const dataUser = JSON.parse(localStorage.dataAuth);

  const total_BV_Right = (id) => {
    return axios.get(
      `${baseURL}/MonyController/Total_BV_Right?customerId=${id}`
    );
  };

  const { data: totalBVRight } = useQuery(
    "total_BV_Right",
    () => total_BV_Right(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const total_BV_Left = (id) => {
    return axios.get(
      `${baseURL}/MonyController/Total_BV_Left?customerId=${id}`
    );
  };

  const { data: totalBVLeft } = useQuery(
    "total_BV_Left",
    () => total_BV_Left(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const getLeftCv_RightCV = (id) => {
    return axios.get(`${baseURL}/Charts/GetLeftCv_RightCV?CustomerId=${id}`);
  };

  const { data: cvs } = useQuery(
    "getLeftCv_RightCV",
    () => getLeftCv_RightCV(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  return (
    <section className="content-area-cards">
      <h4 className="fw-bolder">Commission Volume (CV)</h4>
      <div className="row mt-4 gy-4 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <AreaCard
            colors={["#e4e8ef", "#e7b621"]}
            percentFillValue={(cvs?.data.leftCv / totalBVLeft?.data) * 100 || 0}
            cardInfo={{
              title: "Left CVs",
              value: `${cvs?.data.leftCv}`,
            }}
            classes={'fs-small'}
            description={"Achieved CVs"}
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <AreaCard
            colors={["#e4e8ef", "#23211a"]}
            percentFillValue={(cvs?.data.rightCv / totalBVRight?.data) * 100 || 0}
            cardInfo={{
              title: "Right CVs",
              value: `${cvs?.data.rightCv }`,
            }}
            classes={'fs-small'}
            description={"Achieved CVs"}
          />
        </div>
        <div className="col-md-6 col-lg-4">
          {/* <AreaCard
            colors={["#ffffff", "#6AE1B7", "#93c56b"]}
            percentFillValue={(cvs?.data.totalProfit / 100) * 100}
            cardInfo={{
              title: "Total Profit",
              value: `${(cvs?.data.totalProfit / 100) * 100}`,
            }}
            classes='fs-6'
            description={"Achieved CVs"}
          /> */}
          <div className="area-card box py-3 text-center">
            <div className="row justify-content-between w-100 m-0">
              <div className="d-flex flex-column justify-content-center h-100 ps-3">
                <h6 className={`fw-bold m-0 fs-5 `}>Total Profit</h6>
                <span className="fs-middle fw-bold total">{cvs?.data.totalProfit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
