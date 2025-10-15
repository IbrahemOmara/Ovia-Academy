import React, { useContext, useState } from 'react'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import { StoreContext } from '../../../../context/storeContext';
import OTP from '../OTP/OTP';

export default function PopBankAccount() {

    const {togglePopUpBankWall,setTogglePopUpBankWall} = useContext(StoreContext);
    const {showPopUp,setShowPopUp} = useContext(StoreContext);
    const {confirmOtpShow,setConfirmOtpShow} = useContext(StoreContext);

    const closePopUp = ()=>{
        if(togglePopUpBankWall){
            setShowPopUp('d-block')
            setTogglePopUpBankWall(!togglePopUpBankWall)
          }
          else {
            setShowPopUp('d-none')
            setTogglePopUpBankWall(!togglePopUpBankWall)
          }
    }

  return (
    <>
      <div className={`pt-2 pb-4`}>
        <div className="">
          <div className="close d-flex justify-content-end">
              <button onClick={closePopUp} className='btn text-white border-0 bg-grdient mx-2'>X</button>
          </div>
          <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row d-flex justify-content-center mt-4">
                        <div className={`${confirmOtpShow==='d-block'?'d-none':'d-block'} col-md-10`}>
                            <DragAndDrop/>
                        </div>
                        <div className={`${confirmOtpShow} col-md-10`}>
                            <OTP/>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
