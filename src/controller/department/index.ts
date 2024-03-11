import { inject, injectable } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
} from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";

import { BaseController } from "../base";
import { DepartmentService } from "../../service/department";

@controller("/employees/it")
export class DepartmentController extends BaseController {
  constructor(
    @inject(DepartmentService) private readonly _DepartmentService: DepartmentService
  ) {
    super(_DepartmentService)
  }
}
