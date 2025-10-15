import React from 'react';
import './AnimationBoy.css';
import boyHome from '../../assets/images/boyHome.png'; 
import boyHome2 from '../../assets/images/boyHome2.png'; 
import lapHome from '../../assets/images/lapHome.png'; 
import mobHome from '../../assets/images/mobHome.png'; 


export default function AnimationBoy() {
  return (
    <>
     <div className="box ms-auto ">
        <div className="d-flex ms-4 ">
            <div className="lapHome ts-scale ">
                <img className='w-100 ts-zezag ' src={lapHome}/>
            </div>
            <div className="boyHome' ts-bounce">
                <img className='w-100 ts-zezag ' src={boyHome}/>
            </div>
        </div>
        <div className="d-flex me-4">
            <div  className="boyHome2 ts-bounce ">
                <img className='w-100 ts-zezag' src={boyHome2} />
            </div>
            <div  className="mobHome ts-scale">
                <img className='w-100 ts-zezag' src={mobHome} />
            </div>
        </div>
        <div className="bg-world"></div>
     </div>
    </>
  )
}
