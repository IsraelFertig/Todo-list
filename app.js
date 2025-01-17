import { connectToMongoDB } from "./config/DB.config.js";
import { config } from "dotenv";
config();
connectToMongoDB();



import express from 'express'; 
const app = express();

import cors from 'cors';
import cookieParser from "cookie-parser";
app.use(cors());






app.use(cookieParser());
app.use(express.json());




import userRouter from "./routes/user.route.js";


app.use("/users",userRouter);













app.listen(3000, () => {
  console.log('server is runing on port 3000');
});