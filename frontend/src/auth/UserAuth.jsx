import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User.Contex'
import {useNavigate} from 'react-router-dom'

const UserAuth = ({children}) => {

    const {user} = useContext(UserContext)
    const [loading , setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const Navigate = useNavigate()
    
   

    useEffect(()=>{
        if(user)
            {
                setLoading(false)
            }
        
        if(!token || !user)
        {
            Navigate('/login')
        }

    },[])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    
    )
}

export default UserAuth
