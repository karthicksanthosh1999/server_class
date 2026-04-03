import express from 'express';
import { dbConnection } from './config/db.js';
import userRouter from './src/router/user.router.js';
import authRouter from './src/router/auth.router.js';
import cookieParser from 'cookie-parser';
import postsRoutes from './src/router/post.router.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()


const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["POST", "GET", "PUT", "DELETE"]
    }
));
app.use(express.json())
app.use(cookieParser())

app.use("/", (req, res) => {
    return res.json(
        {
            message: "Welcome to the server",
            statusCode: 200
        }
    )
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts", postsRoutes)

const startConnections = async () => {
    await dbConnection()
    app.listen(process.env.PORT, () => {
        console.log("Server is running...")
    })
}

startConnections()