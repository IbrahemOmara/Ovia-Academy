import React from 'react';
import pcHome from '../../assets/images/PcCoin.png'; 
import chart from '../../assets/images/chart.png'; 
import lapHome from '../../assets/images/lapHome.png'; 
import mobHome from '../../assets/images/mobHome.png'; 

export default function AnimationPc() {
  return (
    <>
       <div className="box ms-auto mb-5">
        <div className="d-flex ms-4 ">
            <div className="lapHome ts-scale ">
                <img className='w-100 ts-zezag ' src={lapHome} alt="" />
            </div>
            <div className="boyHome ts-bounce">
                <img className='w-100 ts-zezag ' src={pcHome} alt="" />
            </div>
        </div>
        <div className="d-flex me-4">
            <div className="boyHome2 ts-scale  ">
                <img className='w-100 ts-zezag' src={chart} alt="" />
            </div>
            <div className="mobHome ts-bounce">
                <img className='w-100 ts-zezag' src={mobHome} alt="" />
            </div>
        </div>
        <div className="bg-world"></div>
     </div>
    </>
  )
}
