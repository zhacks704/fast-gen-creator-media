import { Router } from "express";
import apiRoutes from "./api.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.use("/api", apiRoutes);

export default router;

