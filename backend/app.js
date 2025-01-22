import express from 'express'
import morgan from 'morgan'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("hello world");
});

import userRouter from './routers/user.routes.js';

// routes declaration
// we declare routes as middleware by using "use."
app.use("/api/v1/users", userRouter)
                        // raha s ham routers pr jayege 
//exmpale of req -> http://localhost:3000/api/v1/users/register


export default app;