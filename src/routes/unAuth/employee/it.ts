import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { ItController } from "../../../controller/employee";
import CheckValidator from "../../../middleware/checkValidation";
import { container } from "../../../config/inversify";

const controller = container.get(ItController);
const valiMiddleware = container.get(CheckValidator);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/department",);

router.post(
  "/",
  valiMiddleware.checkMailExists,
  valiMiddleware.checkDepartmentExists,
  controller.store
);
router.put(
  "/",
  valiMiddleware.checkMailExists,
  valiMiddleware.checkDepartmentExists,
  controller.update
);
router.delete("/:id", controller.delete);

export default router;
