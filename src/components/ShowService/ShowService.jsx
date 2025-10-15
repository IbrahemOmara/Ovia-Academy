import React from 'react'
import './ShowService.css';
import arrow from '../../assets/images/services/arrow.png'

export default function ShowService({icon,title}) {
  return (
    <>
      <div className="service m-lg-0 position-relative">
        <div className="icon">
            <img src={icon} alt="" srcset="" />
        </div>
        <div className="title-service mt-5 ms-3">
         <div className="row">
          <div className="col-3">
            <img className='d-block' src={arrow} alt="" srcset="" />
          </div>
          <div className="col-9">
            <h3 className='' >
              {title.split('\n').map(str => <p>{str}</p>)}
            </h3>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}
