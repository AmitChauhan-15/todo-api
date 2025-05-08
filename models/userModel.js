import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: [true, "This email is already been used."],
      validate: [validator.isEmail, "Please provide valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },
  },
  { versionKey: false }
);

// hashing password before saving
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
