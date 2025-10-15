import React from 'react';
import './ShowMission.css';
import circleVision from '../../assets/images/visionCircle.png';
import lineMission from '../../assets/images/lineMission.png';


export default function ShowMission({title,desVision,brdrImg}) {
  return (
    <>
       <div className="content-vision mission">
            <div className="vision-text text-white">
                <h4 className="title-vision text-center">{title}</h4>
                <p className=''>{desVision}</p>
            </div>
            <div className='img-border end-0'>
                <img className='w-100 h-100' src={brdrImg} alt="vision & mission"/>
            </div>
        </div>
        <div className='arrow-vision  d-none d-md-block'>
          <img className='circle-vision' src={circleVision} alt="vision & mission"/> 
          <img className='img-arrow arrow-mission' src={lineMission} alt="momentum"  />
        </div>
    </>
  )
}
