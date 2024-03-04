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

@injectable()
export class BaseController implements interfaces.Controller {
  private readonly _service;
  constructor(service:any) {
    this._service = service
  }

  async getAll(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const list: any = await this._service.getList();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async findOne(data: any) {
    return this._service.findOne(data);
  }

  async store(data:any){
    return this._service.create(data)
  }

  async delete(id:String){
    return this._service.delete(id)
  }

  async update(id:String , data:any){
    return this._service.update(id,data)
  }
}
