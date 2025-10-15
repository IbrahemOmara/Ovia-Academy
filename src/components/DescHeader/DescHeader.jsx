import React from 'react';
import './DescHeader.css';
import titleHeader from '../../assets/images/title-header.svg';

export default function DeskHeader() {
  return (
    <>
      <div className="description me-auto p-4 p-md-2 pt-0">
        <div className='title-header'>
            <img className='w-100 h-100' src={titleHeader}/>
        </div>
        <p className='text-white mt-3'>Ruwad is aiming to teach young people freelance skills and 
        educate them about trading to cope and meet the requirements of the global job market
        </p>
      </div>
    </>
  )
}
