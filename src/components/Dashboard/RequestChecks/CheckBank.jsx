import React from 'react'
import './RequestChecks.css'
import logo from '../../../assets/Ovia-logo/Ovia.png'
import imgBANKCHECK from '../../../assets/images/dashboard/BANK CHECK.png'
import bgLogo from '../../../assets/images/dashboard/bgLogo.png'
import signature  from '../../../assets/images/dashboard/signature.png'
export default function CheckBank({check}) {

  return (
    <>
       <div className="card-check">
            <div className="row">
                <div className="col-6">
                    <div className="logo">
                        <img className='w-100 h-100 object-fit-fill' src={logo}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className='form-control'>
                        <span className='d-block ms-auto '>{check.week_Date_To?check.week_Date_To:'Date'}</span>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-5 col-md-4 text-end">
                    <label htmlFor="pay" className='fs-small fw-semibold'>PAY TO THE ORDER<span className='d-block text-start'>OF</span>:</label>
                </div>
                <div className="col-7 col-md-8">
                    <div className='form-control'>{check.name?check.name:'Name'}</div>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-3">
                    <div className='form-control justify-content-end'> ${check.total?check.total:'0'}</div>
                </div>
            </div> 
            {/* <div className="row justify-content-end align-items-center">
                <div className="col-8">
                    <div name='price' className='form-control justify-content-around'>
                        <span className=''>{check.totalInWords}</span>
                        <span className='text-black'> DOLLARS</span>
                    </div>
                </div>
            </div> */}
            <div className="row align-items-center justify-content-between mt-2">
                <div className="col-3 ms-3 text-end">
                    <label htmlFor="date" className='fw-semibold'>SIGNATURE</label>
                </div>
                <div className="col-8">
                    <div className='form-control'>
                        <img src={signature} alt="signature momnetum" />
                    </div>
                </div>
            </div>
            
            <div className="bg">
                <img className='w-100 h-100 object-fit-fill' src={bgLogo}/>
            </div>
        </div>
    </>
  )
}
