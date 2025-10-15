import React from 'react'
import { Bars } from 'react-loader-spinner'

export default function BtnLoading({color}) {
  return (
    <>
     <div className="m-auto w-25 d-flex align-items-center justify-content-center">
        <Bars
            height="30"
            width="35"
            color= {color}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
     </div>
    </>
  )
}
