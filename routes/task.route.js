import {Router} from "express";
import {getAllTasks , addTask , deleteTaskById , updateTaskStatusById} from "../controllers/task.controller.js";


const router = Router();

router.get("/get-all-tasks",getAllTasks);

router.post("/add-task",addTask);

router.delete("/telete-task-by-id/:id",deleteTaskById);

router.put("/update-task-status-by-id/:id",updateTaskStatusById);





export default router;