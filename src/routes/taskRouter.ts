import { Router } from "express";
import { addTask, deleteTask, editTask, getAllTask, getTask } from "../controllers/taskController";

const router = Router();

router.get("/", getAllTask);

router.post('/addtask', addTask);

router.get("/task/:id", getTask);

router.put("/edit-task", editTask);

router.delete("/delete-task/:id", deleteTask);

export default router;
