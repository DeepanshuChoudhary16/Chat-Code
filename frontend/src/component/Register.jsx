import React,{useState , useContext}from "react";
import {  useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/User.Contex";

const  Register =()=> {
    const navigate = useNavigate();

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [message,setMessage] = useState('')

    const {setUser} = useContext(UserContext)

    function submitHandler(e){
        e.preventDefault()
        axios.post('/api/v1/users/register',{
            email,
            password
        })
        .then((res)=>{
            console.log(res.data)

            const {user,token } = res.data.data
            localStorage.setItem('token',token)
            setUser({...user})

            setMessage("User Successfully Register")
            setTimeout(()=> navigate('/'),2000)
        })
        .catch((err) =>{
            console.log(err.response.data)
        })
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-white text-center">Register</h2>
            <form onSubmit={submitHandler} className="mt-6">
                <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                    </label>
                    <input
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Login
            </button>
        </form>
        <p className="mt-4 text-sm text-green-500 text-center">{message}</p>
        <p className="mt-4 text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <button
                onClick={() => navigate('/login')}
                className="font-medium text-blue-500 hover:underline"
            >
            Log In
            </button>
        </p>
        </div>
    </div>
  );
}


export default Register;
