import express from "express";
import morgan from "morgan";
import { config } from "./config/index.js";
import { applySecurity } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { logger } from "./utils/logger.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

// Security (helmet, cors, rate limiting)
applySecurity(app);

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Logging
app.use(
  morgan(config.nodeEnv === "production" ? "combined" : "dev", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

// Routes
app.use(express.static("public"));
app.use("/api", routes);

// 404 + error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
