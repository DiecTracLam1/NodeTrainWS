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

import { ItService } from "../service/employees";

@controller("/employees/it")
export class ItController implements interfaces.Controller {
  constructor(@inject(ItService) private readonly _service: ItService) {
  }

  @httpGet("/")
  async getAll() {
    // this.context.role == IT

    return await this._service.getList();
  }
}
