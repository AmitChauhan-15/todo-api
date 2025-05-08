import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(" ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => new AppError(err.message, 400);

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendError = (err, res) => {
  const { status, statusCode, message, isOperational } = err;

  // Operational error which is created by developer and send it to client
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });

    // Programming error or other unknown error which shouldn't be leaked to client
  } else {
    console.log("ERROR : ", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "MongooseError") err = handleDuplicateFieldsDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  sendError(err, res);
};

export default globalErrorHandler;
