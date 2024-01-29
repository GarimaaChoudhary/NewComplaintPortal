import React from 'react'
import Admin from '../components/Admin/Admin'
import {Routes,Route} from 'react-router-dom'
import LoginAdmin from '../components/Admin/LoginAdmin'

const AdminRouters = () => {
  return (
    <div>
        <Routes>
            <Route path='/*'element={<Admin/>}></Route>
            <Route path='/login'element={<LoginAdmin/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRouters
