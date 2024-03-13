import { inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { clientRedis } from "../../database/redis.connect";

import { EmployeeService } from "../../service/employees";
import { Api400Error, Api500Error } from "../../core/errorResponse";

import { BaseController } from "../base";

export class LoginController extends BaseController {
  constructor(
    @inject(EmployeeService) private readonly _employeeService: EmployeeService
  ) {
    super(EmployeeService);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return next(new Api400Error("Missing email or password"));
    try {
      const user = await this._employeeService.findOne({ email });

      if (!user) return next(new Api400Error("Email was not exist"));

      let employeeCount = await clientRedis.v4.hGet("employeeListBlock", email);

      let checkPassword = await bcrypt.compare(password, user?.password || "");

      if (!checkPassword) {
        let countBlock;
        if (!employeeCount) {
          countBlock = 1;
          await clientRedis.v4.hSet("employeeListBlock", email, countBlock);
        } else {
          countBlock = Number.parseInt(employeeCount) + 1;
          await clientRedis.v4.hSet("employeeListBlock", email, countBlock);
        }

        return next(
          new Api400Error(
            `Incorrect password. You have ${
              6 - countBlock
            } attempts left to log in`
          )
        );
      }

      await clientRedis.v4.hSet("employeeListBlock", email, 0);

      if (process.env.SECRET_KEY) {
        const accessToken = jwt.sign(msgBody, process.env.SECRET_KEY);
        const userId = user.employee_id;
        return res.json({ success: true, accessToken, userId });
      }
    } catch (error: any) {
      console.log(error);
      return next(new Api500Error());
    }
  };
}
