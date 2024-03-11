import { inject, injectable, targetName } from "inversify";
import { interfaces, request, response, next } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
// import ContextMiddleware from "../../middleware/ContextMiddle";
import { Context } from "../../context";

import { container } from "../../config";
import { TYPES } from "../../constant/types";
import { Api500Error } from "../../core/errorResponse";
// import { fluent } from "../../middleware/ContextMiddle";

@injectable()
export class BaseController implements interfaces.Controller {
  private readonly _service;
  @inject(TYPES.Context) private _contextMiddle: any;
  constructor(service: any) {
    this._service = service;
  }

  getAll = async () => {
    const containerControll: any = container.get(TYPES.Context);
    try {
      const list: any = await this._service.getList();
      containerControll._req.res.json(list);
    } catch (error: any) {
      // return next(new Api500Error());
    }
  };

  getById = async () => {
    const containerControll: any = container.get(TYPES.Context);
    try {
      return this._service.getById(containerControll._req.params?.id);
    } catch (error) {
      // return next(new Api500Error());
    }
  };

  findOne = async (data: any) => {
    return this._service.findOne(data);
  };

  store = async (req: any) => {
    const containerControll: any = container.get(TYPES.Context);
    const check =  this._service.store(req.body);
    if(check) containerControll._req.res.send("Success")
  };

  delete = async (req: any) => {
    return this._service.delete(req.params?.id);
  };

  update = (req: any) => {
    const { id, ...data } = req.body;
    return this._service.update(id, data);
  };
}
