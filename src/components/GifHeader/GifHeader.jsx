import React from 'react'
import gifHeader from '../../assets/images/gifHeader.gif';



export default function GifHeader() {
  return (
    <>
       <div className="description desc-gif ">
           <div className="gif mx-auto m-lg-0">
            <img className='w-100 h-100' src={gifHeader} alt="" />
           </div>
        </div>
    </>
  )
}
