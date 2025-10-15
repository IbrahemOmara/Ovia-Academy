import React from 'react';
import './ShowServices.css';
import ShowService from '../ShowService/ShowService'
import servicesWave from '../../assets/images/services/serviceLineWave.png'



export default function ShowSercives({icons,titles}) {
  return (
    <>
      <div className="ShowSercives position-relative">
       <div className="container">
        <div className="row m-auto gy-5">
            <div className="col-6 col-lg-3">
                <ShowService icon={icons.icon1} title={titles.title1} />
            </div>
            <div className="col-6 col-lg-3">
                <ShowService icon={icons.icon2} title={titles.title2}/>
            </div>
            <div className="col-6 col-lg-3">
                <ShowService icon={icons.icon3} title={titles.title3}/>
            </div>
            <div className="col-6 col-lg-3">
                <ShowService icon={icons.icon4} title={titles.title4}/>
            </div>
        </div>
       </div>
       <div className="bg-show-services d-none d-lg-block">
          <img src={servicesWave}/>
        </div>
      </div>
    </>
  )
}
