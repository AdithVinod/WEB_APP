import express from 'express'
const app = express();
import dotenv from 'dotenv'
import userRoutes from "./routes/userRoutes.js"

import { connectDB } from './config/db.js';
connectDB();

app.use(express.json());

dotenv.config();

app.use("/api/users", userRoutes);

const port = process.env.PORT;

app.get("/", (req, res)=>{
    res.send('server is ready');
    
});

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});