import {
  createShortUrlService,
  resolveShortUrlService,
  getStatsService,
} from "../services/urlService.js";
import log from "../../../logging-middleware/logger.js";

export const createShortUrl = async (req, res) => {
  try {
    const response = await createShortUrlService(req.body);
    res.status(201).json(response);
  } catch (err) {
    if (err.message === "url is required") {
      await log("backend", "warn", "controller", err.message);
      return res.status(400).json({ error: err.message });
    } else if (err.message === "shortcode already exists") {
      return res.status(409).json({ error: err.message });
    }

    await log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToLongUrl = async (req, res) => {
  const { code } = req.params;
  try {
    const longUrl = await resolveShortUrlService(code, req);
    return res.redirect(longUrl);
  } catch (err) {
    if (err.message === "not_found")
      return res.status(404).json({ error: "Not found" });
    if (err.message === "expired")
      return res.status(410).json({ error: "Link expired" });

    await log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStats = async (req, res) => {
  const { code } = req.params;
  try {
    const stats = await getStatsService(code);
    res.json(stats);
  } catch (err) {
    if (err.message === "not_found")
      return res.status(404).json({ error: "Not found" });

    await log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
