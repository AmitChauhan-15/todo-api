import Task from "../models/taskModel.js";
import AppError from "../utils/appError.js";

export const createTask = async (req, res, next) => {
  try {
    const { name, completed = false } = req.body;
    const { id: userId } = req.user;

    if (!("name" in req.body || "completed" in req.body))
      next(
        new AppError("Please provide at least a name or completed status to update the task.", 401)
      );

    const task = await Task.create({ name, completed, userId });

    res.status(201).json({
      status: "success",
      data: { task },
      message: "Task is successfully created.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const tasks = await Task.find({ userId }).select("-userId");

    res.status(200).json({
      status: "success",
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;

    if (!("name" in req.body || "completed" in req.body))
      next(
        new AppError("Please provide at least a name or completed status to update the task.", 401)
      );

    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    }).select("-userId");

    if (!task) {
      return next(new AppError("No task found!", 404));
    }

    res.status(200).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return next(new AppError("No task found!", 404));
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
