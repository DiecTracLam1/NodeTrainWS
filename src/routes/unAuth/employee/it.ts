import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { ItController } from "../../../controller/employee";
import { container } from "../../../config/inversify";

const controller = container.get(ItController);

router.get("/", controller.getAll);

export default router;
