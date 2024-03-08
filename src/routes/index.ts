import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import unAuthRouter from "./unAuth";
import authRouter from "./auth";
import CheckValidator from "../middleware/checkValidation";
import { container } from "../config/inversify";
// import ContextMiddleware from "../middleware/ContextMiddle";
import { Context } from "../context";
import { TYPES } from "../constant/types";
import { contextMiddleware } from "../middleware/ContextMiddle";

const valiMiddleware = container.get(CheckValidator);
// const context = container.get(ContextMiddleware)

console.log("routes");

router.use(
  "/",
  (req: any) => {
    let context = new Context(container, req);
    container.rebind<Context>(TYPES.Context).toConstantValue(context);
    // new contextMiddleware().bindContext(req);
    return req.next();
  },
  // contextMiddleware,
  // valiMiddleware.checkJWT,
  // valiMiddleware.checkAuth,
  unAuthRouter
);
router.use("/auth", authRouter);

export default router;
