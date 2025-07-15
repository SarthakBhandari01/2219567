// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import urlRoutes from "./routes/urlRoutes.js";
import log from "../../logging-middleware/logger.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// URL routes
app.use("/", urlRoutes);

// Start server after DB connects
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      log("backend", "info", "server", `Server running on port ${PORT}`);
    });
  } catch (error) {
    log("backend", "error", "server", error.message);
    process.exit(1);
  }
};

start();
