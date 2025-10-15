import React from 'react'
import './Title.css';
import circleTItleC from '../../assets/images/circleTItle1.png';

export default function Title({title}) {
  return (
    <>
        <div className="title position-relative">
            <div className="title-img">
              <img className='w-100' src={circleTItleC} />
            </div>
            <h2 className='fw-bolder'>{title.split('\n').map((str,i) => <p className='m-0' key={i++}>{str}</p>)}</h2>
        </div>
    </>
  )
}
