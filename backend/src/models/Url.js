import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true, unique: true },
    expiry: { type: Date, required: true }, // ← default set in controller
    clicks: { type: Number, default: 0 },
    clickDetails: [
      {
        timestamp: { type: Date, default: Date.now },
        referrer: String,
        geoLocation: String,
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
