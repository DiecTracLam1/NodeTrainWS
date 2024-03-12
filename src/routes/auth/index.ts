import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { LoginController } from "../../controller/auth/login";
import { EmployeeService } from "../../service/employees";
import { container } from "../../config/inversify";
import CheckValidator from "../../middleware/checkValidation";


const controller = new LoginController(container.get(EmployeeService));
const valiMiddleware = container.get(CheckValidator);


router.post("/login",valiMiddleware.checkEmployeeBlocked ,controller.login);

export default router;
