import express from 'express'
import morgan from 'morgan'
import Cookies from 'cookies'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    req.cookies = new Cookies(req, res); // Attach the Cookies instance
    next();
  });

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