import { inject, injectable } from "inversify";
import { interfaces, request, response, next } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import ContextMiddleware from "../../middleware/ContextMiddle";

@injectable()
export class BaseController implements interfaces.Controller {
  private readonly _service;
  @inject(ContextMiddleware) private _context: any;
  constructor(service: any) {
    this._service = service;
  }

  async getAll(y) {
    try {
      const list: any = await this._service.getList();
      console.log(this._context["_context"]._res);
      this._context["_context"]._res.json(list);

    } catch (error) {
      res.send("error");
      // next(error);
    }
  }

  async findOne(data: any) {
    return this._service.findOne(data);
  }

  async store(data: any) {
    return this._service.create(data);
  }

  async delete(id: String) {
    return this._service.delete(id);
  }

  async update(id: String, data: any) {
    return this._service.update(id, data);
  }
}
