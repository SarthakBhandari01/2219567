// logging-middleware/logger.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LOGGING_URL = "http://20.244.56.144/evaluation-service/logs";
const LOG_TOKEN = process.env.TOKEN; 

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      LOGGING_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${LOG_TOKEN}` } }
    );
  } catch (_) {}
};

export default log;
