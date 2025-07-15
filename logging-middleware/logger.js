import axios from "axios";

const LOGGING_URL = "http://20.244.56.144/evaluation-service/logs";

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(LOGGING_URL, {
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (_) {
    // ignore
  }
};

export default log;
