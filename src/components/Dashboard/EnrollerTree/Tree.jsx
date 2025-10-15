import * as React from "react";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { useQuery } from "react-query";
import RecursiveTreeView from "./RecursiveTreeView";

export default function Tree() {
  const dataUser = JSON.parse(localStorage.dataAuth);

  const EnrollerTree11 = (id) => {
    return axios.get(
      `${baseURL}/CustomerInfo/EnrollerTree111111?sponsorId=${id}`
    );
  };

  const { data: tree } = useQuery(
    "EnrollerTree11",
    () => EnrollerTree11(dataUser.referId),
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {tree?.data ? (
        <RecursiveTreeView data={tree?.data?.value} dataUser={dataUser} />
      ) : (
        <></>
      )}
    </>
  );
}
