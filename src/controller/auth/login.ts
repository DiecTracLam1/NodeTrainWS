import { inject } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
} from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";

import { EmployeeService } from "../../service/employees";

@controller("/auth")
export class LoginController implements interfaces.Controller {
  constructor(@inject(EmployeeService) private readonly _service: EmployeeService) {
  }

  async login() {
    // this.context.role == IT

    return await this._service.getList();
  }
}
