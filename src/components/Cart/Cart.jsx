import React, { useEffect, useState } from "react";
import imgCar1 from "../../assets/images/packages/1.jpeg";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart_packages, setCart_packages] = useState(
    JSON.parse(localStorage.getItem("cart_packages"))
  );

  const removePkg = (pkg) => {
    setCart_packages(cart_packages.filter((pk) => pk.id !== pkg.id));
  };

  let totalCost = 0;
  cart_packages?.map((pkg) => {
    totalCost += pkg.price;
  });

  const extraCost = cart_packages[0]?.price;
  const subCost = totalCost - extraCost;

  const navigate = useNavigate();
  const pay = (id) => {
    navigate(`/pay/${totalCost}`);
  };

  useEffect(()=>{
    localStorage.setItem("cart_packages", JSON.stringify(cart_packages));
  },[cart_packages])

  return (
    
    <>
      <section className="cart min-vh-100 py-3" id="cart">
        <div className="container">
          <h5 className=" pb-2 my-fw-bold border-bottom w-50 mt-5">Your Cart</h5>
          <p className="mt-3">
            You have {cart_packages.length} item in your cart
          </p>
          <div className="row  gy-3">
            <div className="col-md-7">
              <div className="row gy-3">
                {cart_packages.map((pkg) => {
                  return (
                    <div className="col-12" key={pkg.id}>
                      <div className="cart-box">
                        <div className="img-cart">
                          <img
                            src={pkg.photo ? pkg.photo : imgCar1}
                            alt="cart momentum"
                          />
                        </div>
                        <h6 className="my-fw-bold">{pkg.name}</h6>
                        <span className="fw-medium">${pkg.price}</span>
                        <button
                          onClick={() => removePkg(pkg)}
                          type="button"
                          className="btn text-danger fs-5"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-5">
              <div className="cart-summary p-3 d-flex flex-column align-items-center">
                <h5 className="my-fw-bold w-100">Cart Summary</h5>
                <div className="row w-100 border-bottom mt-3">
                  <div className="col-6 p-0">
                    <h6 className="">Extra Cost</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>${extraCost}</h6>
                  </div>
                </div>
                <div className="row w-100 border-bottom mt-3">
                  <div className="col-6 p-0">
                    <h6 className="">Sub Total</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>${subCost}</h6>
                  </div>
                </div>
                <div className="row w-100 border-bottom mt-3">
                  <div className="col-6 p-0">
                    <h6 className="">Grand Total</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>${totalCost}</h6>
                  </div>
                </div>
                <div className="row w-100 border rounded-2 align-items-center mt-3">
                  <div className="col-5">
                    <span>${totalCost}</span>
                  </div>
                  <div className="col-7 text-end p-0">
                    <button
                      onClick={pay}
                      type="button"
                      className="btn text-white bg-grdient "
                    >
                      Checkout <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
