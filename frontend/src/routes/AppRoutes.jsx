import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Login from '../component/Login'
import Register from '../component/Register'
import Home from '../component/Home'
import Project from '../component/Project'

const AppRoutes = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/project' element={<Project/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes
