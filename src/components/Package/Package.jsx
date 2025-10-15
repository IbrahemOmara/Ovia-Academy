import React, { useState } from "react";
import "../Packages/Packages.css";
import package1 from "../../assets/images/packages/1.jpeg";
import iconCV from "../../assets/images/packages/iconCV.png";
import iconState from "../../assets/images/packages/iconState.png";
import BtnLoading from "../BtnLoading/BtnLoading";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Package({ pkg }) {
  let navigate = useNavigate();
  const cart_packages = JSON.parse(localStorage.getItem("cart_packages"))||[];
  const [btnLoading, setBtnLoading] = useState(false);
  const getPackage = (_package) => {

    setBtnLoading(true);
    const foundpkg = cart_packages?.find((pkg) => pkg.id === _package.id);
    if(foundpkg){
        setTimeout(() => {
            setBtnLoading(false);
            navigate(`/my-cart`);
          }, 500);
        toast.warning('This package found in your cart!');
    } else {
        cart_packages.push(_package);
        localStorage.setItem("cart_packages", JSON.stringify(cart_packages));
        setTimeout(() => {
          navigate(`/my-cart`);
          setBtnLoading(false);
        }, 500);
    }
   
  };

  return (
    <>
      <div className="card">
        <div className="img-card">
          <img src={pkg.photo ? pkg.photo : package1} />
        </div>
        <div className="description ">
          <h5>{pkg.name}</h5>
          <p>{pkg.shortDescription}</p>
          <div className="row gy-3 justify-content-between">
            <div className="col-6 col-md-4">
              <div className="cv">
                <img className="me-2 icon" src={iconCV} />
                <span>{pkg.sponsorDistributorToDistributor}</span> CV
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="packages-state">
                <img className="me-2 icon" src={iconState} />
                <span>{pkg.sponsorDistributorToDistributor}</span> D.C
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="price text-black fw-bold  ">
                <i className="fa-solid fa-braille me-2"></i>
                <span>Pionts</span> <span>{pkg.price}</span>
              </div>
            </div>
          </div>

          <button
            disabled={btnLoading}
            onClick={() => getPackage(pkg)}
            className="btn-get-package fw-bold"
          >
            {btnLoading ? <BtnLoading color={"#000"} /> : " Get Package"}
          </button>
        </div>
      </div>
    </>
  );
}
