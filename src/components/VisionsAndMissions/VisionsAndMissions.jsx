import React from 'react'
import Title from '../Title/Title'
import './visionsAndMissions.css'
import ShowVision from '../ShowVision/ShowVision'
import brdrVisionSquar from '../../assets/images/visionSquare.png';
import brdrMissionSquare from '../../assets/images/missionSquare.png';
import middleLine from '../../assets/images/visionLine.png';
import ShowMission from '../ShowMission/ShowMission';


export default function VisionsAndMissions() {

  const visions = {
    vision1:`Our vision at Ovia for Education, Trading, and Marketing is to be a leading global 
              provider of comprehensive educational resources, advanced trading tools, and impactful 
              marketing solutions.`,
    vision2:`We aspire to create a community where individuals can learn, grow, and succeed together, 
              driving positive change in the financial industry and beyond.`,
    vision3:` Through our dedication to excellence and innovation, we aim to inspire and empower 
              the next generation of traders, marketers, and leaders to thrive in an ever-evolving world.`,

  }

  const missions = {
    mission1:`At Ovia for Education, Trading, and Marketing, 
              our mission is to empower individuals with the knowledge and skills they 
              need to excel in both the financial markets and the dynamicfjeld of marketing.`,
    mission2:`We are committed to providing high-quality education, innovative trading solutions,
             and cutting-edge digital marketing tools that strategies to help our clients achieve 
             their goals and unlock their full potential.`,
    mission3:` cutting-edge marketing strategies to help our clients achieve their goals and unlock 
              their full potential.`,

  }
            

  return (
    <>
      <section className="visions-missions px-3 overflow-x-hidden" id="visionsAndMissions">
        <Title title={`Visions &\nMissions`} />
        <div className="container mt-5 p-0  position-relative overflow-hidden">
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-start position-relative ">
            <div className="col-md-5 p-0">
              <ShowMission desVision={missions.mission1} brdrImg={brdrMissionSquare}
               title={'Our Mission'}/>
            </div>
          </div>
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-end position-relative ">  
            <div className="col-md-5 p-0">
              <ShowVision desVision={visions.vision1} brdrImg={brdrVisionSquar}
               title={'Our Vision' }/>
            </div>
          </div>
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-start  position-relative ">  
            <div className="col-md-5 p-0 ">
              <ShowMission desVision={missions.mission2} brdrImg={brdrMissionSquare}
               title={'Our Mission'}/>
            </div>
          </div>
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-end position-relative ">  
            <div className="col-md-5 p-0">
              <ShowVision desVision={visions.vision2} brdrImg={brdrVisionSquar}
               title={'Our Vision' } />
            </div>
          </div>
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-start  position-relative ">  
            <div className="col-md-5 p-0 ">
              <ShowMission desVision={missions.mission3} brdrImg={brdrMissionSquare}
               title={'Our Mission'}/>
            </div>
          </div>
          <div className="row px-3 mt-3 mt-md-0 p-md-0 gy-4 justify-content-end  position-relative ">  
            <div className="col-md-5 p-0">
              <ShowVision desVision={visions.vision3} brdrImg={brdrVisionSquar}
               title={'Our Vision' } />
            </div>
          </div>
          <div className="middle-line d-none d-md-block h-100">
            <img className='h-100' src={middleLine} alt="" />
          </div>
        </div>
      </section>
    </>
  )
}
