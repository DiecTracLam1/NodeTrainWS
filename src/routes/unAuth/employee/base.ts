import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import itRouter from "./it";
import accountantRouter from "./accountant";
import CheckValidator from "../../../middleware/checkValidation";
import { container } from "../../../config/inversify";

const valiMiddleware = container.get(CheckValidator);

router.use("/it", valiMiddleware.checkRole('it') ,itRouter);
router.use("/accountant",()=>valiMiddleware.checkRole('accountant') , accountantRouter);


export default router;
