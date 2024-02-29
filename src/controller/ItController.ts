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

import { ItService } from "../service/employees/It";

@controller("/employees")
export class ItController implements interfaces.Controller {
  constructor(@inject(ItService) private readonly _service: ItService) {}

  @httpGet("/")
  async getAll(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    const list = await this._service.getList();
    res.json(list.rows);
  }
}
