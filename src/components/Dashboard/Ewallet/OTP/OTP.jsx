import React, { useState } from 'react'
import imgOTP from '../../../../assets/images/dashboard/otp.png'
import { useFormik } from 'formik'
import axios from 'axios'
import { baseURL } from '../../../../utils/baseURL'
import BtnLoading from '../../../BtnLoading/BtnLoading'
import { toast } from 'react-toastify'

export default function OTP() {

  const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;
  const [verifyLoading,setVerifyLoading] = useState(false);

  const ConfirmationOtp = async(id,otp)=>{
     await axios.put(`${baseURL}/CustomerInfo/ConfirmationOtp?userId=${id}&otp=${otp}`).then((res) => {
     toast.success('OTP Verified Successfully');
     setVerifyLoading(false);
     window.location.reload();
    }).catch((err)=>{
      toast.error('Wrong, Resend OTP')
      console.log(err);
      setVerifyLoading(false);
      otpForm.resetForm();
    })
  }

  const requestNewOtp = async(id)=> {
     await axios.get(`${baseURL}/CustomerInfo/RequestNewOtp?userId=${id}`).
    then((res) =>{
      res.data;
      toast.success(res.data);
    } ).catch((err) => {
      err;
      toast.success(err)
    });
  }

  const resendOTP = async() => {
    await requestNewOtp(userId)
    console.log('Resend');
  }
  
  const otpForm = useFormik({
    initialValues: {
      otp: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
    onSubmit: (values) => {
      values.otp = values.otp1 + values.otp2 + values.otp3 + values.otp4 + values.otp5 + values.otp6;
      console.log(values.otp);
      setVerifyLoading(true);
      ConfirmationOtp(userId,values.otp);
      resetForm();
      console.log(values);
      
    },
  })


  return (
    <section className='otp pb-5'>
        <h2 className='text-white my-fw-bold text-center'>OTP</h2>
      <div className="container">
       <div className="row justify-content-center">
            <div className="col-12">
                <img className='w-100 h-100 object-fit-fill' src={imgOTP} />
            </div>
       </div>
       <div className="row text-center text-white ">
            <div className="col-12">
                <h6 className='my-fw-bold '>Enter Verification Code</h6>
                <p className='fs-small'>We have sent a  verification code to Your<br/> Account Number</p>
            </div>
       </div>
       <form onSubmit={otpForm.handleSubmit} >
        <div className="row text-white mt-2 justify-content-around ">
            <div className="col-2">
                <input value={otpForm.values.otp1} name='otp1' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div>
            <div className="col-2">
                <input value={otpForm.values.otp2} name='otp2' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div>
            <div className="col-2">
                <input value={otpForm.values.otp3} name='otp3' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div>
            <div className="col-2">
                <input value={otpForm.values.otp4} name='otp4' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div>
            <div className="col-2">
                <input value={otpForm.values.otp5} name='otp5' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div>
            <div className="col-2">
                <input value={otpForm.values.otp6} name='otp6' onChange={otpForm.handleChange} className='form-control bg-transparent border-0 shadow-0 rounded-0 p-0 w-100 text-center border-bottom' maxLength={1} type="text" />
            </div> 
        </div>
        <div className="">
          <button
            type="submit"
            className="btn bg-grdient w-50 d-block m-auto mt-5"
          >
             {
             verifyLoading?<BtnLoading color={'#223F4A'}/>:'Submit'
            }
          </button>
        </div>
        <div className="resend-otp">
          <button onClick={resendOTP} type='button' className='btn d-block m-auto fs-small'>
            <span className='text-white'>Resend OTP</span>
          </button> 
        </div>
       </form>
      </div>
    </section>
  )
}
