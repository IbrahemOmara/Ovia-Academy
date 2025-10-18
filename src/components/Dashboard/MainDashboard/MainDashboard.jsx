import React, { useState } from 'react'
import './MainDashboard.css'
import AreaCards from './AreaCards/AreaCards';
import AreaCards2 from './AreaCards2/AreaCards2';
import MemberInfo from './MemberInfo/MemberInfo';
import UploadImg from '../BunnyImages/UploadImg';


export default function MainDashboard() {  

  return (
      <section className="main-dashboard mt-3">

        <div className="container-fluid">
          <div className="row gy-4 ">
              <div className="col-md-6">
                <AreaCards />
              </div>
              <div className="col-md-6">
                <AreaCards2 />
              </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="member-info">
                <MemberInfo/>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
