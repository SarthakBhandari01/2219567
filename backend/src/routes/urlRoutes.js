import express from "express";
import {
  createShortUrl,
  getStats,
  redirectToLongUrl,
} from "../controller/urlController.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:code", getStats);
router.get("/:code", redirectToLongUrl);

export default router;
