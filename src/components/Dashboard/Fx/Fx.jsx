import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgFx from '../../../assets/images/dashboard/fx.jpg';
import Loading from '../../Loading/Loading';

export default function Fx() {

  const myFx = 'https://www.mygtcfx.com/getview?view=register&token=97vowwww7owwwwww';
  const [loading,setIsLoading] = useState(true);

  useEffect(() => {
   setTimeout(()=>{
    setIsLoading(false);
   },  2000); 
  }, []);

  if(loading) return <Loading/>
  return (
    <>
      <section className="fx mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <Link target='_blanck' className='d-block h-75 rounded-3 overflow-hidden shadow border' to={myFx}>
                <img className='w-100 h-100 object-fit-fill' src={imgFx} alt="fx gtc"/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
