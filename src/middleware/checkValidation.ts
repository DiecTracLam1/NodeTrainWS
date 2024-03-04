import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { EmployeeController } from "../controller/employee/EmployeeController";

@injectable()
export default class CheckValidator {
  constructor(
    @inject(EmployeeController)
    private readonly _employeeController: EmployeeController
  ) {}

  checkJWT(req: any, res: Response, next: NextFunction){
    if (!req.headers.authorization) {
      res.status(401);
      res.send("Miss authorization");
    }
    next();
  }

  async checkAuth(req: any, res: Response, next: NextFunction) {
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

    let checkPassword: boolean = false;
    let user;
    if (decode) {
      let data = await this._employeeController.findEmployee(decode);
      user = data[0];
      checkPassword = await bcrypt.compare(decode.password, user.password);
      req.role = user.role;
    }

    if (!checkPassword) {
      req.role = "";
      res.send("User is not existed");
      res.status(401);
      return;
    }

    next();
  }

  checkRole(req: any, res: Response, next: NextFunction, role: String) {
    res.json(req)
    if (req.role === role) next();
    else res.send("Not persmission");
  }
}
