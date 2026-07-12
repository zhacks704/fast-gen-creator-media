import { Router } from "express";
import * as apiController from "../controllers/api.controller.js";
import { validateBody } from "../middleware/validate.js";

const router = Router();

router.post("/process", apiController.process);
router.post("/download", apiController.download);

router.get("/items", apiController.listItems);
router.get("/items/:id", apiController.getItem);
router.post("/items", validateBody(["name"]), apiController.createItem);

export default router;	

