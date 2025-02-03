import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";
import { Server } from "socket.io";
import { ApiError } from "./utils/ApiError.js";
import jwt from "jsonwebtoken";


dotenv.config({
    path:'./.env'
    
})


connectDB()
.then(()=>{
    const server  = app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on host: ${process.env.PORT}`);
    
    })

    app.on("error",(error)=>{
        console.log("Error:", error)
        throw error;
    })
    
    const io = new Server(server,{
        cors:{
            origin:"*"
        }
    })


    io.use((socket,next) =>{
        try {
            const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.replace("Bearer ", "");
            if(!token){
                return next(new Error('Authentication Error , token is not found for socket'))
            }

            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

            if(!decoded)
            {
                return next(new Error('Authentication Error , decoded token is not found for socket'))
            }

            socket.user = decoded;
            next();

        } 
        catch (error) {
            next(error)
            throw new ApiError(400,"socket is not connected")
            
        }
    })
    
    io.on('connection', socket => {
        
        console.log("a user is connect")

        socket.on('event', data => { /* … */ });
        socket.on('disconnect', () => { /* … */ });
    });
})
.catch((error)=>{
    console.log("Database is fail to connect", error);
})



