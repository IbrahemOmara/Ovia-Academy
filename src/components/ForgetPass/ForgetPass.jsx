import { useFormik } from 'formik';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/sign-up/bgSingUp.png';
import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseURL } from '../../utils/baseURL';

export default function ForgetPass() {


    async function forGetPass(email){
        await axios.get(`${baseURL}/User/ForgetPassword?Email=${email}`).
        then(({data}) => {
            console.log('k');
          toast.success('please check your email,'+ data)
    
        }).catch((error)=>{ 

          console.log(error);
          toast.error(error.response.data);
        });
    }


    const forgetPass = useFormik({
        initialValues:{
            email: ''
        },
        onSubmit: (values) =>{
            console.log(values);
            forGetPass(values.email);
        }
    })

  return (
    <>
     <section className="forget-password sign-up min-vh-100 d-flex align-items-center justify-content-center">
        <div className="bg-sign-up">
            <img src={bg}  className='w-100 h-100 object-fit-fill'/>
        </div>
        <form onSubmit={forgetPass.handleSubmit} className='w-100'>
            <div className="container">
                <div className="bg-form">
                    <div className="header-form me-3">
                        <Link to="/">
                            <div className="logo ms-auto">
                                <img className='w-100 h-100 ' src={logo} alt="" srcSet="" />
                            </div>
                        </Link>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-7">
                            <h2 className='text-main-2 fw-bold'>Forgot Password?</h2>
                            <p className='w-75'>Enter your email address below and we will send you instructions to reset your password.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input onChange={forgetPass.handleChange} name='email' type="email" className="form-control" id="email" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <button type='submit' className='btn w-100 btn-sign-up'>Send Reset Link</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link className="btn w-100 text-white btn-signIn h-auto " to='/sign-in'>Back to login</Link>   
                        </div>
                    </div>
                </div>
            </div>              
        </form>
     </section> 
    </>
  )
}
