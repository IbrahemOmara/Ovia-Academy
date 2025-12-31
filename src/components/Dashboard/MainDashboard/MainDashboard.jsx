
import './MainDashboard.css'
import AreaCards from './AreaCards/AreaCards';
import AreaCards2 from './AreaCards2/AreaCards2';
import MemberInfo from './MemberInfo/MemberInfo';
import Profile from '../Profile/Profile'


export default function MainDashboard() {  

  return (
      <section className="main-dashboard mt-3">

        <div className="container-fluid row ">
          <div className="col-6 mb-4">
            <div className="col-12">
              <div className="member-info">
                <Profile />
              </div>
            </div>
          </div>
          <div className="col-6 gy-4 ">
              <div className=" mb-4 col-12">
                <AreaCards />
              </div>
              <div className="col-12">
                <AreaCards2 />
              </div>
          </div>
          
        </div>
      </section>

  )
}
