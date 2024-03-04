import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import itRouter from "./it";
import accountantRouter from "./accountant";
import CheckValidator from "../../../middleware/checkValidation";
import { container } from "../../../config/inversify";
import { EmployeeController } from "../../../controller/employee/EmployeeController";

const valiMiddleware = container.get(CheckValidator);

router.use("/it", itRouter);
router.use("/accountant", accountantRouter);


export default router;
