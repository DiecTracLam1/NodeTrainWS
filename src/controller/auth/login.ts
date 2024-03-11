import { inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { EmployeeService } from "../../service/employees";
import { Api400Error, Api500Error } from "../../core/errorResponse";
import MESSAGE from "../../core/messageCodes";

import { BaseController } from "../base";

export class LoginController extends BaseController {
  constructor(
    @inject(EmployeeService) private readonly _employeeService: EmployeeService
  ) {
    super(EmployeeService);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    debugger
    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return next(new Api400Error("Missing email or password"));
    try {
      const user = await this._employeeService.findOne({ email });
      if (!user) {
        return next(new Api400Error("Incorrect email or password"));
      }

      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return next(new Api400Error("Incorrect email or password"));
      }
      if (process.env.SECRET_KEY) {
        const accessToken = jwt.sign(msgBody, process.env.SECRET_KEY);
        const userId = user.employee_id;
        // this.context.role = user.role
        return { success: true, accessToken, userId };
      }
    } catch (error: any) {
      return next(new Api500Error());
    }
  }
}
