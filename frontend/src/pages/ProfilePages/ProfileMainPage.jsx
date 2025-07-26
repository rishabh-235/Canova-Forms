import ProfileSideBar from '../../components/ProfileSideBar'
import { Outlet } from 'react-router-dom'

function ProfileMainPage() {
  return (
    <div className='main-page-container'>
      <ProfileSideBar />
      <Outlet />
    </div>
  )
}

export default ProfileMainPage