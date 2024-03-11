import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { AccountantController } from "../../../controller/employee";
import { container } from "../../../config/inversify";
import CheckValidator from "../../../middleware/checkValidation";

const controller = container.get(AccountantController);
const valiMiddleware = container.get(CheckValidator);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  valiMiddleware.checkMailExists,
  valiMiddleware.checkMailExists,
  controller.store
);
router.put(
  "/",
  valiMiddleware.checkMailExists,
  valiMiddleware.checkMailExists,
  controller.update
);
router.delete("/:id", controller.delete);

export default router;
