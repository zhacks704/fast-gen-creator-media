import app from "./app.js";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";

const server = app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port} [${config.nodeEnv}]`);
});

function shutdown(signal) {
  logger.info(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    logger.info("Server closed.");
    process.exit(0);
  });
  // Force-exit if it hangs
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});
