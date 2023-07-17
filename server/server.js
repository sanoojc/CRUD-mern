import express from "express";
import 'dotenv/config.js'
import userRouter from "./Router/userRouter.js"
import adminRouter from "./Router/adminRouter.js"
import path from 'path'
import cors from 'cors'
import connectDB from "./config/dbConnect.js";

import cookieParser from "cookie-parser";
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + "/public"))
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true
    })
)
connectDB()


app.use("/",userRouter)
app.use("/admin",adminRouter)


app.listen(8000,()=>{
    console.log("server running...")
}) 
