import { inject, injectable } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
  httpPost,
} from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";


import { EmployeeService } from "../../service/employees";
import { BaseController } from "../base";


export class EmployeeController extends BaseController {
  constructor(
    @inject(EmployeeService) private readonly _EmployeeService: EmployeeService
  ) {
    super(_EmployeeService)
  }
}
