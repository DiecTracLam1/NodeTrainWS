import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { LoginController } from "../../controller/auth/login";
import { EmployeeService } from "../../service/employees";
import { container } from "../../config/inversify";

const controller = new LoginController(container.get(EmployeeService));

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller.login(req, res, next);
      console.log("success");
      res.json(data)
    } catch (error) {
        console.log("error")
    }
  }
);

export default router;
