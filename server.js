import express from "express"
import connectDB from "./DB/connect.js"
import dotenv from 'dotenv'
import cors from 'cors'
import testroute from "./Routes/testroute.js"
import expensetestrouter from "./Routes/expensetestroute.js"
const server = express()
server.use(express.json())
dotenv.config()
server.use(cors({
    origin: 'https://moneymoasic.netlify.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Content-Length', 'Authorization'],
}));
server.use('/api/v1/user', testroute)
server.use('/api/v1/expense', expensetestrouter)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(5000, console.log("server is listing on port 5000"))
    } catch (error) {
        console.log(error);
    }
}
start()