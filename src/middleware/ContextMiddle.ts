import { Context } from "../context";
import { container } from "../config";
import { TYPES } from "../constant/types";


export const contextMiddleware = (req: any, res: any, next: any) => {
  let context = new Context(container, req, res);
  // console.log('rebind , ', context)
  container.rebind<Context>(TYPES.Context).toConstantValue(context);
  next();
};
