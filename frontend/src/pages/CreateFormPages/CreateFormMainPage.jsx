import CreateFormSideBar from '../../components/CreateFormSideBar'
import { Outlet } from 'react-router-dom'

function CreateFormMainPage() {
  return (
    <div className='main-page-container'>
        <CreateFormSideBar />
        <Outlet />
    </div>
  )
}

export default CreateFormMainPage