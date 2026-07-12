import { logger } from "../utils/logger.js";

export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "Internal server error"
      : err.message || "Something went wrong";

  logger.error(`[${status}] ${err.message}`, err.stack);

  res.status(status).json({ error: message });
}
