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
import aiRouter from './routers/ai.routes.js'
app.use("/api/v1/users", userRouter)
app.use("/api/v1/project",projectRouter);
app.use("/api/v1/ai",aiRouter)

export default app;