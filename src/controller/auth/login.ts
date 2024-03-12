import { inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { clientRedis } from "../../database/redis.connect";

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

  login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return next(new Api400Error("Missing email or password"));
    try {
      const user = await this._employeeService.findOne({ email });

      if (!user) return next(new Api400Error("Email was not exist"));

      let listEmployees = JSON.parse(
        await clientRedis.v4.GET("employeeListBlock")
      );

      let checkPassword = await bcrypt.compare(password, user?.password || "");

      if (!checkPassword) {
        let index = listEmployees.findIndex((e: any) => e.email === email);
        let employee;
        if (index >= 0)
          employee = listEmployees[index] = {
            ...listEmployees[index],
            count: listEmployees[index].count + 1,
          };
        else {
          employee = { email, count: 1, isBlocked: false };
          listEmployees.push(employee);
        }

        if (employee?.count >= 5)
          listEmployees[index] = {
            ...listEmployees[index],
            isBlocked: true,
          };

        await clientRedis.v4.SET(
          "employeeListBlock",
          JSON.stringify([...listEmployees])
        );
        
        return next(
          new Api400Error(
            `Incorrect password. You have ${
              6 - employee?.count
            } attempts left to log in`
          )
        );
      }
      listEmployees = listEmployees.filter((e: any) => e.email !== email);
      await clientRedis.v4.SET(
        "employeeListBlock",
        JSON.stringify([...listEmployees])
      );

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
