import React from "react";
import AreaCard from "../AreaCard/AreaCard";
import "./AreaCards.css";
import axios from "axios";
import { baseURL } from "../../../../utils/baseURL";
import { useQuery } from "react-query";

export default function AreaCards() {
  const dataUser = JSON.parse(localStorage.dataAuth);

  const thisWeekDirect = (id) => {
    return axios.get(
      `${baseURL}/DynamicDaySettingController/ThisWeekDirect?customerId=${id}`
    );
  };

  const { data: thisWeekDirects } = useQuery(
    "thisWeekDirect",
    () => thisWeekDirect(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const lastWeekDirect = (id) => {
    return axios.get(
      `${baseURL}/DynamicDaySettingController/LastWeekDirect?customerId=${id}`
    );
  };

  const { data: lastWeekDirects } = useQuery(
    "lastWeekDirect",
    () => lastWeekDirect(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const getTotalDirect = (id) => {
    return axios.get(
      `${baseURL}/MonyController/getTOtaldirect?sponcerid=${id}`
    );
  };

  const { data: totalDircts } = useQuery(
    "getTotalDirect",
    () => getTotalDirect(dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  return (
    <section className="content-area-cards">
      <h4 className="fw-bolder">Direct Signups</h4>
      <div className="row mt-4 gy-4 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <AreaCard
            colors={["#e4e8ef", "#e7b621"]}
            percentFillValue={(thisWeekDirects?.data/totalDircts?.data)*100||0}
            cardInfo={{
              title: "This Week",
              value: `${thisWeekDirects?.data||0}`,
            }}
            classes={'fs-small'}
            description={"Direct for this Week"}
          />
        </div>
        <div className="col-md-6 col-lg-4">
          <AreaCard
            colors={["#e4e8ef", "#23211a"]}
            percentFillValue={(lastWeekDirects?.data/totalDircts?.data)*100||0}
            cardInfo={{
              title: "Last Week",
              value: `${lastWeekDirects?.data||0}`,
            }}
            classes={'fs-small'}
            description={"Direct for last Week"}
          />
        </div>
        <div className="col-md-6 col-lg-4">
          {/* <AreaCard
                    colors={["#ffffff", "#6AE1B7", "#93c56b"]}
                    percentFillValue={0}
                    cardInfo={{
                    title: "Total Direct",
                    value: `${0}`,
                    }}
                    classes={'fs-5'}
                    description={'Achieved Legs'}
                /> */}
          <div className="area-card box py-3 text-center">
            <div className="row justify-content-between w-100 m-0">
              <div className="d-flex flex-column justify-content-center h-100 ps-3">
                <h6 className={`fw-bold m-0 fs-5 `}>Total Direct</h6>
                <span className="fs-middle fw-bold total">{totalDircts?.data||0}</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
