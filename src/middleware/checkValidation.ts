import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { EmployeeController } from "../controller/employee/EmployeeController";
import { container } from "../config";
import { TYPES } from "../constant/types";

@injectable()
export default class CheckValidator {
  constructor(
    @inject(EmployeeController)
    private readonly _employeeController: EmployeeController
  ) {}

  checkJWT = (req: any, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.status(401);
      res.send("Miss authorization");
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
      res.json(error.message);
      res.status(401);
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
      res.send("User is not existed");
      res.status(401);
      return;
    }

    next();
  };

  checkRole = (role: String) => {
    const containerController: any = container.get(TYPES.Context);
    if (containerController.getUser().role === role) containerController._req.next();
    else containerController._req.res.send("Not persmission");
  };
}
