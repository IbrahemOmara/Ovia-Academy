import React from 'react';
import './University.css';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import { baseURL } from '../../../utils/baseURL';
import { useQuery } from 'react-query';

export default function University() {


  const gifsUniversity = () => {
    return axios.get(`${baseURL}/Admin/GetHomePhoto?description=dashboard`);
}

const gifsUni = useQuery('gifsUniversity',gifsUniversity);
const gifs= gifsUni?.data?.data;
const urls = gifs?.map(gif=>{
    return gif.url;
});    

if( gifsUni.loading) return <Loading/>

  return (
    <>
      <section className="university">
        <div className="container-fluid"> 
          <div className="row justify-content-center gy-4">
            {urls?.map(url=>{
              return (
                <div className="col-md-6" key={url}>
                  <div className="gif-uni">
                    <img src={url} alt="" />
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
