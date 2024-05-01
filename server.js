import express from "express"
import connectDB from "./DB/connect.js"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import cors from 'cors'
import user_auth_router from './Routes/user_auth_routes.js'
import expensetestrouter from "./Routes/expensetestroute.js"
const server = express()
server.use(express.json())
server.use(cookieParser())
dotenv.config()
server.use(cors({
    // origin: 'https://moneymoasic.netlify.app',
    // origin: 'http://localhost:5173',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    // exposedHeaders: ['Content-Length', 'Authorization'],
    supportsCredentials: true,
    allowedOrigins: ['*'],
    allowedOriginsPatterns: [],
    allowedHeaders: ['*'],
    allowedMethods: ['*'],
    exposedHeaders: [],
}));
server.get('/api/v1/check', (req, res) => {
    try {
        const token = req.cookies.JWT;
        // JWT.verify(token,process.env.JWT_SECRET)
        if (token) {
            res.status(201).send('authenticated')
        } else {
            res.status(201).send('notAuthenticated')
        }
    } catch (error) {
        console.log(error.mesage);
    }
})
server.use('/api/v1/user/auth', user_auth_router)
server.use('/api/v1/expense', expensetestrouter)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(8000, console.log("server is listing on port 8000"))
    } catch (error) {
        console.log(error);
    }
}
start()