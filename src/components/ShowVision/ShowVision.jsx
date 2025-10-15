import React from 'react';
import './ShowVision.css';
import circleVision from '../../assets/images/visionCircle.png';
import lineVision from '../../assets/images/lineVision.png';



export default function ShowVision({desVision, brdrImg,title}) {

  return (
    <>
       <div className="content-vision">
            <div className="vision-text text-white">
                <h4 className="title-vision text-center">{title}</h4>
                <p className=''>{desVision}</p>
            </div>
            <div className='img-border start-0'>
                <img className='w-100 h-100' src={brdrImg} />
            </div>
        </div>
        <div className='arrow-vision d-none d-md-block'>
            <img className='circle-vision' src={circleVision} /> 
            <img className='img-arrow' src={lineVision} />
        </div>
    </>
  )
}
