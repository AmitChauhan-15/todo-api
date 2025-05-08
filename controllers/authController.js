import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import { promisify } from "util";

const signJWT = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });

const verifyJWT = async (token) => {
  // Verification token
  const user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  return user;
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword are same
    if (password && confirmPassword && password !== confirmPassword) {
      return next(new AppError("Password and confirm password are not same!", 400));
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: newUser,
      message: "User is successfully created.",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError("Please provide email and password!", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordCorrect(password, user.password)))
      return next(new AppError("Username or password is incorrect!", 401));

    const token = signJWT(user._id);

    res.status(200).json({
      status: "success",
      message: "User is logged in.",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    const user = await verifyJWT(token);

    if (!user) {
      return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
