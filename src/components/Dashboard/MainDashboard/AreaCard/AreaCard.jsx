import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
  } from "recharts";

export default function AreaCard({ colors, percentFillValue, cardInfo ,description,classes}) {
  const filledValue = (percentFillValue / 100) * 360; // 360 degress for a full circle
  const remainedValue = 360 - filledValue;

  const data = [
    { name: "Remained", value: remainedValue },
    { name:description, value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${(value / 360) * 100} %`;
  };
  return (
    <div className="area-card box">
        <div className="row justify-content-between w-100 m-0">
          <div className="col-7 p-0">
            <div className="d-flex flex-column justify-content-center h-100 ps-3">
              <h6 className={`fw-bold m-0 ${classes} `}>{cardInfo.title}</h6>
              <span className="fs-middle fw-bold">{cardInfo.value}</span>
            </div>
          </div>
          <div className="col-5 p-0 ">
            <div className="">
              <PieChart width={70} height={80}>
                  <Pie
                  data={data}
                  cx={20}
                  cy={40}
                  innerRadius={15}
                  fill="#e4e8ef"
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={-270}
                  endAngle={150}
                  stroke="none"
                  >
                  {data.map((entry, index) => (
                      <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      />
                  ))}
                  </Pie>
                  <Tooltip formatter={renderTooltipContent} />
              </PieChart>
            </div>
          </div>
        </div>
       
       
    </div>
  )
}
