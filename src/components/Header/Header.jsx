import React from 'react'
import './Header.css'
import AnimationPc from '../AnimationPc/AnimationPc'
import GifHeader from '../GifHeader/GifHeader'
import Slider from "react-slick";
import DeskHeader from '../DescHeader/DescHeader';
import AnimationBoy from '../AnimationBoy/AnimationBoy';

export default function Header() {

  let settings = {
    dots: false,
    arrows:false,
    infinite: true,
    fade: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let settings2 = {...settings};
  // settings2.rtl = true; 

  return (
    <>
      <header className='header' id='header'>
        <div className="container">
          <div className="row flex-column-reverse flex-md-row align-items-center">
            <div className="col-md-7 p-0">
              <Slider {...settings}>
                <GifHeader/>
                <DeskHeader/>
              </Slider>
            </div>
            <div className="col-md-5">
              <Slider {...settings2} >
                <AnimationBoy/>
                <AnimationPc/>
              </Slider>
            </div>
          </div>
        </div>
        <div className="bg-header"></div>
        {/* <div className="bg-header-bottom d-none d-md-block">
        </div> */}
      </header>
    </>
  )

}

