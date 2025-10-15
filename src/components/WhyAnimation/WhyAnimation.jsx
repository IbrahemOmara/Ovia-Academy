import React from 'react';
import './WhyAnimation.css';
import icon from '../../assets/images/why.png'

export default function WhyAnimation() {
  return (
    <>
      <div className="circle-why">
            <div className="icon-why ts-scale-why">
                <div className="icon">
                  <img  src={icon} alt="" />
                </div>
            </div>
      </div>
    </>
  )
}
