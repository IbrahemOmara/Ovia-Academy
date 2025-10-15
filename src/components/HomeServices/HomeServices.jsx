import React, { useState } from 'react'
import './HomeServices.css'
import Title from '../Title/Title'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../utils/baseURL'
import { useQuery } from 'react-query'

export default function HomeServices() {

    const getServices = () => {
        return axios.get(`${baseURL}/Admin/GetHomePhoto?description=gifsHomeSer`);
    }

    const services = useQuery('getServices',getServices,{
        refetchOnWindowFocus:false,
        refetchInterval:false,
        refetchOnMount:false,
    });
    const gifs= services?.data?.data;
    const urls = gifs?.map(gif=>{
        return gif.url;
    });    

  return (
    <>
        <section className="hpome-services " id="HomeServices">
            <Title title={'services'}/>
            <div className="container mt-5">
                <div className="row gy-4 justify-content-center">
                    {urls?.map(service=>{   
                        return  (
                                <div className="col-md-5" key={service} >
                                    <div className="gif_ ">
                                        <img src={service} alt="" />
                                        <div className="link">
                                            <Link className='d-block w-100 h-100' to='/our-services'></Link>
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </div>
        </section>
    </>
  )
}
