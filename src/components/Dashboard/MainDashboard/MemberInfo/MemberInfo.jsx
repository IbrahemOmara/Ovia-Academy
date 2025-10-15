import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";
import { baseURL } from "../../../../utils/baseURL";
import { useQuery } from "react-query";

export default function MemberInfo() {
  const dataUser = JSON.parse(localStorage.dataAuth);
  const monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];
  const currentYear = new Date().getFullYear();
  const infosMonthSelles = (year, id) => {
    return axios.get(`${baseURL}/Charts/SellesChart?year=${year}&userId=${id}`);
  };

  const { data: infosMonthesSelles } = useQuery(
    "infosMonthSelles",
    () => infosMonthSelles(currentYear, dataUser.customerAttributeId),
    {
      refetchInterval: false,
    }
  );

  const maxTotal = infosMonthesSelles?.data?.length
    ? infosMonthesSelles.data.reduce(
        (max, month) => (month?.total > max ? month?.total : max),
        infosMonthesSelles.data[0]?.total || 0
      )
    : 0;

  console.log(maxTotal);

  const data = [
    {
      name: "Jan",
      lemitY: 0,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Feb",
      lemitY: maxTotal/5,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Mar",
      lemitY: (maxTotal/5)*2,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Apr",
      lemitY: (maxTotal/5)*3,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "May",
      lemitY: (maxTotal/5)*4,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Jun",
      lemitY: (maxTotal/5)*5,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Jul",
      lemitY: (maxTotal/5)*6,
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Aug",
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Sep",
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Oct",
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Nov",
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
    {
      name: "Dec",
      extrCom: 0,
      com: 0,
      pt: 0,
      curMoLeCv: 0,
      curMoRiCv: 0,
      curRank: 0,
      total: 0,
    },
  ];

  const fillData = () => {
    infosMonthesSelles?.data.map((month) => {
      data[month.month - 1].name = monthes[month.month - 1];
      data[month.month - 1].total = month.total;
    });
  };

  fillData();

  const [opacity, setOpacity] = useState({
    extrCom: 1,
    com: 1,
    pt: 1,
    curMoLeCv: 1,
    curMoRiCv: 1,
    curRank: 1,
    total: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity({ ...opacity, [dataKey]: 0.5 });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  return (
    <div className="legand">
      <h4 className="fw-bold mb-4 ms-3">Member Information</h4>
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={500}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              dataKey={`lemitY`}
              label={{
                value: "In Dollar ($)",
                angle: -90,
                position: "insideBottomLeft",
              }}
            />
            <Tooltip />
            <Legend
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Line
              type="monotone"
              dataKey="com"
              strokeOpacity={opacity.com}
              stroke="#43C5CE"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="extrCom"
              strokeOpacity={opacity.extrCom}
              stroke="#A83B96"
            />
            <Line
              type="monotone"
              dataKey="pt"
              strokeOpacity={opacity.pt}
              stroke="#FC5132"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="curMoLeCv"
              strokeOpacity={opacity.curMoLeCv}
              stroke="#1FCB4F"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="curMoRiCv"
              strokeOpacity={opacity.curMoRiCv}
              stroke="#EB77D8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="curRank"
              strokeOpacity={opacity.curRank}
              stroke="#FFC01E"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              strokeOpacity={opacity.total}
              stroke="#223f4a"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#A83B96" }}>
            <span>Extra Commission Plan Percentage</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#43C5CE" }}>
            <span>Commission Plan Percentage</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#FC5132" }}>
            <span>Package Type</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#EB77D8" }}>
            <span>Current Month RightCVs</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#1FCB4F" }}>
            <span>Current Month LeftCVs</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#FFC01E" }}>
            <span>Current Rank</span>
          </li>
        </div>
        <div className="col-md-6 col-lg-4">
          <li style={{ color: "#223f4a" }}>
            <span>Total</span>
          </li>
        </div>
      </div>
    </div>
  );
}
