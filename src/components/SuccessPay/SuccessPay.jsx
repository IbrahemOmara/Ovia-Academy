import React, { useContext, useEffect } from 'react';
import imgPay from '../../assets/images/Payment-success.png';
import { StoreContext } from '../../context/storeContext';

export default function SuccessPay() {
const {setBuyPkg} = useContext(StoreContext);

  useEffect(() => {
    localStorage.removeItem("cart_packages");
    setTimeout(() => setBuyPkg(true), 500);
  }, []);

  return (
    <>
      
      <div className="success-pay vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
            <img className='d-block w-50 h-50 m-auto' src={imgPay} alt="Success Pay!"/>
        </div>

      </div>
    </>
  )

}
