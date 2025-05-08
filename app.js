import express from "express";
import cors from "cors";
import { login, register } from "./controllers/authController.js";
import taskRouter from "./routers/taskRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the To-Do Application.",
  });
});

// ROUTES
app.post("/api/register", register);
app.post("/api/login", login);
app.use("/api/tasks", taskRouter);

app.all("/{*any}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
