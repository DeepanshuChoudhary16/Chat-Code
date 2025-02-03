import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// 

app.use(cookieParser());

import userRouter from './routers/user.routes.js';
import  projectRouter from './routers/project.routes.js'
// routes declaration
// we declare routes as middleware by using "use."
app.use("/api/v1/users", userRouter)
                        // raha s ham routers pr jayege 
//exmpale of req -> http://localhost:3000/api/v1/users/register
app.use("/api/v1/project",projectRouter);

export default app;