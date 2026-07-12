import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "../config/index.js";

export function applySecurity(app) {
  app.use(helmet());

  app.use(
    cors({
      origin: config.corsOrigin,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: false,
    })
  );

  app.use(
    rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many requests, please try again later." },
    })
  );
}
