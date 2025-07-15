import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const DEV_DB_URL = process.env.DEV_DB_URL;
