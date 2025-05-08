import express from "express";
import { protect } from "../controllers/authController.js";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getAllTasks);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
