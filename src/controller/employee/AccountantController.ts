import { inject, injectable } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
} from "inversify-express-utils";

import { AccountantService } from "../../service/employees";
import { BaseController } from "../base";

@injectable()
export class AccountantController extends BaseController{
  constructor(
    @inject(AccountantService) private readonly _AccountantService: AccountantService
  ) {
    super(_AccountantService)
  }
}
