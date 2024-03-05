import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import unAuthRouter from "./unAuth";
import authRouter from "./auth";
import CheckValidator from "../middleware/checkValidation";
import { container } from "../config/inversify";
import ContextMiddleware from "../middleware/ContextMiddle";
import { Context } from "../context";

const valiMiddleware = container.get(CheckValidator);
const context = container.get(ContextMiddleware)

console.log("routes");

router.use(
  "/",
  // (req, res, next) => valiMiddleware.checkJWT(req, res, next),
  // (req, res, next) => valiMiddleware.checkAuth(req, res, next),
  unAuthRouter
);
router.use("/auth", authRouter);

export default router;
