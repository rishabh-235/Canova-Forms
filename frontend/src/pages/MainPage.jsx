import "./style/mainpagestyle.css";
import SideBar from '../components/SideBar'
import {Outlet} from 'react-router-dom'
function MainPage() {
  return (
    <div className='main-page-container'>
        <SideBar />
        <Outlet />
    </div>
  )
}
export default MainPage



