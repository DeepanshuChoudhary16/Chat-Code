import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Login from '../component/Login'
import Register from '../component/Register'
import Home from '../component/Home'
import Project from '../component/Project'
import UserAuth from '../auth/UserAuth'

const AppRoutes = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<UserAuth><Home/></UserAuth>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/project' element={<UserAuth><Project/></UserAuth>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes
