import dotenv from "dotenv";

dotenv.config();

function parseOrigins(value) {
  if (!value || value === "*") return "*";

  return value
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT) || 3000,

  nodeEnv: process.env.NODE_ENV || "development",

  corsOrigin: parseOrigins(process.env.CORS_ORIGIN),

  apis: {
    youtube: {
      key: process.env.YOUTUBE_API_KEY || "",
      host: "youtube-media-downloader.p.rapidapi.com",
      baseUrl: "https://youtube-media-downloader.p.rapidapi.com",
    },

    instagram: {
      key: process.env.INSTAGRAM_API_KEY || "",
      host: "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
      baseUrl:
        "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
    },
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
};	

