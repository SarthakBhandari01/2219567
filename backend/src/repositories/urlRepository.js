import Url from "../models/Url.js";

export const findByShortUrl = async (shortUrl) => {
  return Url.findOne({ shortUrl });
};

export const findByOriginalUrl = async (originalUrl) => {
  return Url.findOne({ originalUrl });
};

export const createShortUrl = async (data) => {
  return Url.create(data);
};

export const updateClickStats = async (id, referrer, ip) => {
  return Url.updateOne(
    { _id: id },
    {
      $inc: { clicks: 1 },
      $push: {
        clickDetails: {
          referrer,
          geoLocation: ip,
        },
      },
    }
  );
};

export const getStatsByShortUrl = async (shortUrl) => {
  return Url.findOne({ shortUrl }).lean();
};
