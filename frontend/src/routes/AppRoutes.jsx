import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<div>Home</div>}/>
                <Route path='/login' element={<div>Login</div>}/>
                <Route path='/register' element={<div>Register</div>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes
