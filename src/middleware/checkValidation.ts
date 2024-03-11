import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { EmployeeController } from "../controller/employee/EmployeeController";
import { container } from "../config";
import { TYPES } from "../constant/types";
import { Api401Error, Api404Error, Api403Error } from "../core/errorResponse";
import MESSAGE from "../core/messageCodes";
import { DepartmentController } from "../controller/department";

@injectable()
export default class CheckValidator {
  constructor(
    @inject(EmployeeController)
    private readonly _employeeController: EmployeeController,
    @inject(DepartmentController)
    private readonly _departmentController: EmployeeController
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
    if (decode) {
      let user = await this._employeeController.findOne({
        email: decode?.email,
      });

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

  checkRole = () => {
    const containerController: any = container.get(TYPES.Context);
    const urlSplit = containerController._req.baseUrl.split("/");
    if (containerController.getUser().role === urlSplit[urlSplit.length - 1])
      containerController._req.next();
    else
      return containerController._req.next(new Api403Error("Not persmission"));
  };

  checkMailExists = async (req: any, res: Response, next: NextFunction) => {
    const containerController: any = container.get(TYPES.Context);
    const { email } = containerController._req.body;
    let user = await this._employeeController.findOne({
      email,
    });
    if (!user) next();
    else next(new Api403Error("Email was already exist"));
  };

  checkDepartmentExists = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    const containerController: any = container.get(TYPES.Context);
    const { department_id } = containerController._req.body;
    containerController._req.params = {
      ...containerController._req.params,
      id: department_id,
    };
    let checkExistDepartment = await this._departmentController.getById();
    if (checkExistDepartment) next();
    else next(new Api403Error("Department was not exist"));
  };
}
