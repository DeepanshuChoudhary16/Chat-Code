import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";
import { Server } from "socket.io";
import { ApiError } from "./utils/ApiError.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";


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


    io.use(async (socket,next) =>{
        try {
            const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.replace("Bearer ", "");
            const projectId = socket.handshake.query.projectId;

            if(!mongoose.Types.ObjectId.isValid(projectId))
            {
                return next(new Error('Invalid projectId'))
            }

            socket.project = await projectModel.findById(projectId);

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
        socket.roomID = socket.project._id.toString()
        console.log("a user is connect")

        socket.join(socket.roomID)

        socket.on('project-message',data =>{

            console.log("message: ",data)
            socket.broadcast.to(socket.roomId).emit('project-message', data)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
            socket.leave(socket.roomId)
        });
    });
})
.catch((error)=>{
    console.log("Database is fail to connect", error);
})



