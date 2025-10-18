import React, { useEffect, useState } from 'react'
import './MyBusiness.css'
import Loading from '../../Loading/Loading'

export default function MyBusiness() {

  const [loading,setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
     },  1000); 

  },[]);

  if(loading) return <Loading/>

  return (
    <>
      <section className='my-business text-center '>
        <h2>Business Sooooon</h2>
      </section>
    </>
  )
}
