import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name of the task."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Task should be assign to a user."],
      select: false,
    },
  },
  { versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
