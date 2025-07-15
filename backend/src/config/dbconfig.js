import mongoose from "mongoose";
import log from "../../../logging-middleware/logger.js";
import { DEV_DB_URL } from "./serverConfig.js";

export default async function connectDB() {
  try {
    await mongoose.connect(DEV_DB_URL);
    await log("backend", "info", "handler", "Connected to MongoDB");
  } catch (error) {
    await log("backend", "error", "handler", "Error connecting to MongoDB");
  }
}