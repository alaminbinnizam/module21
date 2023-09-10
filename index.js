import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from 'cors'



//configuring environment variable
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));


//port
const PORT = process.env.PORT || 2020

//rest api
app.get('/', (req, res)=>{
    res.send({
        message:'Hello world'
    })
})

//run listen
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})