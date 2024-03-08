import { Context } from "../context";
import { container } from "../config";
import { TYPES } from "../constant/types";
import { fluentProvide, provide } from "inversify-binding-decorators";
import { fluentContext } from "../constant";
import { inject } from "inversify";

export class contextMiddleware {
  constructor() {}
  bindContext(req: any) {
    let context = new Context(container, req);
    container.rebind<Context>(TYPES.Context).toConstantValue(context);

  }
}
