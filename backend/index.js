import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";
import Redis from "ioredis";

dotenv.config({
    path:'./.env'
    
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on host: ${process.env.PORT}`);
    })
    app.on("error",(error)=>{
        console.log("Error:", error)
        throw error;
    })
})
.catch((error)=>{
    console.log("Database is fail to connect", error);
})

