import React from 'react'
import './Why.css'
import WhyAnimation from '../WhyAnimation/WhyAnimation';
import bgWhy from '../../assets/images/bgWhy.svg';
import  whySelBuy from '../../assets/images/whySelBuy.png';
import bitcoin from '../../assets/images/Bitcoin-1.png'

export default function Why() {
  return (
    <>
      <section id='why' className='why text-white'>
            <div className="container text-center">
              <WhyAnimation/>
              <div className="bg m-auto position-relative">
                <img className='bg-why w-100' src={bgWhy}/>
                <div className="animation-why">
                    <div className="img-why w-100 position-relative">
                      <img className='whySel-buy w-100' src={whySelBuy}/>
                      <div className="div-bitcoin">
                          <img className='img-bitcoin ts-zezag' src={bitcoin}/>
                      </div>
                    </div>
                </div>
              </div>
            </div>         
      </section>
    </>
  )
}
