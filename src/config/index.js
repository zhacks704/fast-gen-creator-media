import dotenv from "dotenv";

dotenv.config();

function parseOrigins(value) {
  if (!value || value === "*") return "*";
  return value.split(",").map((o) => o.trim()).filter(Boolean);
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: parseOrigins(process.env.CORS_ORIGIN),
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },
};
