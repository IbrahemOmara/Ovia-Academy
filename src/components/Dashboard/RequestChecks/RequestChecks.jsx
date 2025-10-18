import React, { useEffect, useState } from 'react';
import './RequestChecks.css';
import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';
import CheckBank from './CheckBank';
import Loading from '../../Loading/Loading';

export default function RequestChecks() {
  const [loading,setIsLoading] = useState(true);
  const [bankChecks, setBankChecks] = useState([])
  const getProfit = async (memberId)=>{
    await axios.get(`${baseURL}/Profit?memberId=${memberId}`).
    then(({data}) =>{
      setBankChecks(data);
    }).catch((err) => {
      console.error(err)}
    )
  }

  useEffect(()=>{
    const memberId = JSON.parse(localStorage.dataAuth).customerAttributeId;
    getProfit(memberId);
    setTimeout(()=>{
      setIsLoading(false);
     },  1000); 

  },[]);

  if(loading) return <Loading/>
  if(bankChecks.length==0) return <h1 className=' text-center'>No Checks</h1>;

  return (
    <>
        <section className='my-checks'>
            <div className="mt-4">
            <div className="row p-0 justify-content-center gy-2">
                <div className="col-md-7 col-lg-5 p-0 p-md-2">
                {
                    bankChecks?.map((check)=>{
                    return <CheckBank check={check}/>
                    })
                }
                </div>
            </div>
            </div>
        </section>
    </>
  )
}
