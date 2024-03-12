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

import { ItService } from "../../service/employees";
import { BaseController } from "../base";
import { TYPES } from "../../constant/types";
import { container } from "../../config";

@controller("/employees/it")
export class ItController extends BaseController {
  constructor(@inject(ItService) private readonly _ItService: ItService) {
    super(_ItService);
  }
}
