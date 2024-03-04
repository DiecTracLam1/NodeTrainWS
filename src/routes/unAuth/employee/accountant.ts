import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { AccountantController } from "../../../controller/employee";
import { container } from "../../../config/inversify";

const controller = container.get(AccountantController);

router.get("/", (req,res,next)=>controller.getAll(req,res,next));
// router.get("/:id", getById);


export default router;
