import { inject, injectable, targetName } from "inversify";
import { interfaces, request, response, next } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
// import ContextMiddleware from "../../middleware/ContextMiddle";
import { Context } from "../../context";

import { container } from "../../config";
import { TYPES } from "../../constant/types";
// import { fluent } from "../../middleware/ContextMiddle";

@injectable()
export class BaseController implements interfaces.Controller {
  private readonly _service;
  @inject(TYPES.Context) private _contextMiddle: any;
  constructor(service: any) {
    this._service = service;
  }

  getAll = async (req:any,res:any,next:any) => {
    try {
      const list: any = await this._service.getList();
      console.log("getAll");
      console.log(this._contextMiddle)
      // console.log(this._context.getContext());
      const containerControll: any = container.get(TYPES.Context);
      containerControll._req.res.json(list);
    } catch (error: any) {
      res.send(error.message);
      // next(error);
    }
  };

  findOne = async (data: any) => {
    return this._service.findOne(data);
  };

  store = async (data: any) => {
    return this._service.create(data);
  };

  delete = async (id: String) => {
    return this._service.delete(id);
  };

  update = (id: String, data: any) => {
    return this._service.update(id, data);
  };
}
