import { injectable } from "inversify";
import { HttpContext } from "inversify-express-utils";
import * as express from "express";
import { container } from "../config";
import { IContext } from "../interface/IContext";

@injectable()
export class Context implements IContext {
  public constructor() {}
  getContext(): any {
    return {
      req: express.request,
      container,
    };
  }
}
