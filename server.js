import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: `${process.cwd()}/.env` });

const connectionString = process.env.DB_CONNECTION.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(connectionString, {
    autoIndex: true,
  })
  .then((con) => console.log("Database is connected"))
  .catch((err) => console.log("Failed to connect database ", err));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
