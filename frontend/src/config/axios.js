import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})
console.log("authorization",localStorage.getItem('token'))


export default axiosInstance;   