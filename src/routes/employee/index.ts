import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import itRouter from "./it";
import accountantRouter from "./accountant";

router.use("/it", itRouter);
router.use("/accountant", accountantRouter);

export default router;
