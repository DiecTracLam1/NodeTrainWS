import express from "express";
import { inject } from "inversify";
import {
  interfaces,
  controller,
  httpGet,
  request,
  response,
  next,
} from "inversify-express-utils";

import { Accountant } from "service/employees/accountant";

// @controller("/employees")
// export class EmployeeController implements interfaces.Controller {
//   constructor(@inject(Accountant) private readonly _service: any) {}

//   @httpGet("/")
//   getAll(
//     @request() req: express.Request,
//     @response() res: express.Response,
//     @next() next: express.NextFunction
//   ) {
//     res.send("employees");
//   }
// }
