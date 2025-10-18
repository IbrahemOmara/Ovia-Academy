import React from 'react'
import './Loading.css'
import { Puff } from 'react-loader-spinner'
export default function Loading() {
  return (
    <>
        {/* <div className="loading vh-100 d-flex align-items-center justify-content-center text-center text-white ">
            <div className="lds-ripple">
                <div></div><div></div>
            </div>
        </div> */}
        <section className='loading vh-100 d-flex justify-content-center align-items-center'>
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#c59846"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </section>
    </>
  )
}
