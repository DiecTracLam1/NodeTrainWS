import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { AccountantController } from "../../../controller/employee";
import { container } from "../../../config/inversify";

const controller = container.get(AccountantController);

router.get("/", controller.getAll);
router.get("/:id", controller.findOne);
router.post("/", controller.store);
router.patch("/", controller.update)
router.delete("/:id", controller.delete)


export default router;
