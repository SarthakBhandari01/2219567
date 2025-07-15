import {
  createShortUrl,
  findByShortUrl,
  getStatsByShortUrl,
  updateClickStats,
} from "../repositories/urlRepository.js";
import generateCode from "../utils/codeGeneration.js";

const MIN_VALIDITY = 30;

export const createShortUrlService = async ({ url, validity, shortcode }) => {
  if (!url) {
    throw new Error("url is required");
  }

  const code = shortcode || generateCode();
  const exists = await findByShortUrl(code);
  if (exists) {
    throw new Error("shortcode already exists");
  }

  const minutes =
    Number.isInteger(validity) && validity > 0 ? validity : MIN_VALIDITY;
  const expiry = new Date(Date.now() + minutes * 60_000);

  const doc = await createShortUrl({
    originalUrl: url,
    shortUrl: code,
    expiry,
  });

  return {
    shortLink: `${process.env.BASE_URL}/${doc.shortUrl}`,
    expiry: doc.expiry.toISOString(),
  };
};

export const resolveShortUrlService = async (code, req) => {
  const doc = await findByShortUrl(code);
  if (!doc) throw new Error("not_found");
  if (doc.expiry < new Date()) throw new Error("expired");

  await updateClickStats(doc._id, req.get("referer") || "direct", req.ip);

  return doc.originalUrl;
};

export const getStatsService = async (code) => {
  const doc = await getStatsByShortUrl(code);
  if (!doc) throw new Error("not_found");

  return {
    clicks: doc.clicks,
    originalURL: doc.originalUrl,
    createdAt: doc.createdAt,
    expiry: doc.expiry,
    clickDetails: doc.clickDetails,
  };
};
