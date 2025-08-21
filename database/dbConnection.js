import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // يقرأ متغيرات البيئة من ملف .env

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eventLog-Project";

export const dbConn = mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected successfully to", MONGO_URI))
  .catch((err) => console.error("Database connection error:", err));
