import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { EmployeeController } from "../controller/employee/EmployeeController";
import { container } from "../config";
import { TYPES } from "../constant/types";
import { Api401Error, Api404Error , Api403Error } from "../core/errorResponse";
import MESSAGE from "../core/messageCodes";

@injectable()
export default class CheckValidator {
  constructor(
    @inject(EmployeeController)
    private readonly _employeeController: EmployeeController
  ) {}

  checkJWT = (req: any, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      next(new Api404Error(MESSAGE.NON_AUTHORITATIVE_INFORMATION));
      return;
    }
    next();
  };

  checkAuth = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(" ")[1];
    let decode: any;
    try {
      if (process.env.SECRET_KEY)
        decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error: any) {
      next(new Api401Error(MESSAGE.UNAUTHORIZED));
      return;
    }

    const containerController: any = container.get(TYPES.Context);
    let checkPassword: boolean = false;
    let user;
    if (decode) {
      let data = await this._employeeController.findOne(decode);
      user = data[0];

      checkPassword = await bcrypt.compare(decode.password, user.password);
      containerController.setUser(user);
    }

    if (!checkPassword) {
      containerController.setUser({});
      next(new Api404Error("User is not existed"));
      return;
    }

    next();
  };

  checkRole = (role: String) => {
    const containerController: any = container.get(TYPES.Context);
    if (containerController.getUser().role === role)
      containerController._req.next();
    else
      return containerController._req.next(new Api403Error("Not persmission"));
  };
}
