import * as mainService from "../services/main.service.js";
import { logger } from "../utils/logger.js";

export async function listItems(req, res, next) {
  try {
    const items = await mainService.listItems();
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
}

export async function getItem(req, res, next) {
  try {
    const item = await mainService.getItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function createItem(req, res, next) {
  try {
    const created = await mainService.createItem(req.body);
    res.status(201).json({ data: created });
  } catch (err) {
    next(err);
  }
}

// New: handles POST /api/process
// Expected to return media info matching the frontend's display shape.
export async function process(req, res, next) {
  try {
    const result = await mainService.process(req.body);

    res.json({
  title: result.title,
  type: result.type,
  format: result.format,
  size: result.size,
  badge: result.badge,
  qualities: result.qualities,
});
  } catch (err) {
    logger.error("Error in process controller:", err);
    next(err);
  }
}

// Handles POST /api/download
export async function download(req, res, next) {
  try {
    const result = await mainService.download(req.body);

    res.json({
      data: result,
    });

  } catch (err) {
    logger.error("Error in download controller:", err);
    next(err);
  }
}
