import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Login from '../component/Login'
import Register from '../component/Register'
import Home from '../component/Home'

const AppRoutes = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes
