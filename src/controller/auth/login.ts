import { inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { EmployeeService } from "../../service/employees";
import { Api400Error, Api500Error } from "../../core/errorResponse";
import MESSAGE from "../../core/messageCodes";

export class LoginController {
  constructor(
    @inject(EmployeeService) private readonly _service: EmployeeService
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return next(new Api400Error("Missing email or password"));
    try {
      const user = await this._service.findOne({ email });
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
      0;
      return next(new Api500Error());
    }
  }
}
