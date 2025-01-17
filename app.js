import { connectToMongoDB } from "./config/DB.config.js";
import { config } from "dotenv";
import {verifyToken , limiter} from "./service/auth.service.js";
config();
connectToMongoDB();

import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(limiter);

import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

app.use("/users", userRouter);
app.use("/tasks",verifyToken, taskRouter);  

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
