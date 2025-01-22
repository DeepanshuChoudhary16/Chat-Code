import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path:'./.env'

})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on host: ${process.env.PORT}`);
})
app.on("error",(error)=>{
    console.log("Error:", error)
    throw error;
})