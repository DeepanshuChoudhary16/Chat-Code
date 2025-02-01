import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/User.Contex";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        setMessage(""); // Reset message before new request

        try {
            console.log("Logging in with:", { email, password });

            const res = await axios.post('/api/v1/users/login', { email, password });
            console.log("Login Success Response:", res);

            const { user, token } = res.data.data;
            if (!token || !token.accessToken) {
                throw new Error("Missing access token in response");
            }

            localStorage.setItem('token', `${token.accessToken}`);
            setUser({...user})

            console.log("Stored Token:", token.accessToken);
            setMessage("Successfully logged in!");

            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.error("Login Error:", err.response?.data || err.message);
            setMessage("Login failed! " + (err.response?.data?.message || "Something went wrong."));
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>
                <form onSubmit={submitHandler} className="mt-6">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
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
                    Don’t have an account?{' '}
                    <button onClick={() => navigate('/register')} className="font-medium text-blue-500 hover:underline">
                        Create one
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
