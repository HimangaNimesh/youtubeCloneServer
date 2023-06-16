import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRoutes from "./server/User/User.Routes.js"
import VideoRoutes from "./server/Video/Video.Routes.js"
import CommentRoutes from "./server/Comment/Comment.Routes.js"
import authRoutes from "./server/auth/auth.Routes.js"

const app =express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error)=> {
        throw error
    })
}

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/videos", VideoRoutes)
app.use("/api/comments", CommentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8000, ()=>{
    connect()
    console.log("Connected!")
})