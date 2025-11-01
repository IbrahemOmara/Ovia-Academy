import React, { useEffect, useState } from "react";
import "./Packages.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { baseURL } from "../../utils/baseURL";
import { useQuery } from "react-query";
import Package from "../Package/Package";

export default function Packages() {
  let cart_packages = (JSON.parse(localStorage.getItem("cart_packages")))||[];

  // console.log(cart_packages);

  const getAllPackages = () => {
    return axios.get(`${baseURL}/Admin/GetAllPackages`);
  };

  let { data, isLoading, isError } = useQuery(
    "getAllPackages",
    getAllPackages,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  console.log(data)
  const packages =  data?.data!='Not found any packages'?data?.data.map((item) => {
    return item;
  }):[];

  console.log(packages)

  if (packages && cart_packages.length === 0) {
    cart_packages.push(packages[0]);
    localStorage.setItem("cart_packages", JSON.stringify(cart_packages));
    console.log(cart_packages);
  }

  useEffect(() => {
    getAllPackages();
    if (!cart_packages) {
      localStorage.setItem("cart_packages", JSON.stringify([]));
      console.log(cart_packages);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="packages min-vh-100" id="packages">
        <div className="container-lg px-3 py-5">
          <h2 className="fw-bolder mb-5">Packages:</h2>
          <div className="row justify-content-center gy-5 ">
            {packages && packages.filter(item => item.packageTypeId != 1).length > 0 ? (
              packages
                .filter(item => item.packageTypeId != 1)
                .map(item => (
                  <div className="col-sm-6" key={item.id}>
                    <Package pkg={item} />
                  </div>
                ))
            ) : (
              <h4 className="text-center text-muted">No packages found</h4>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
