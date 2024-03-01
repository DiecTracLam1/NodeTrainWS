import { inject } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
} from "inversify-express-utils";

import { AccountantService } from "../service/employees";

@controller("/employees/accountant")
export class AccountantController implements interfaces.Controller {
  private _departmentId: string;
  constructor(
    @inject(AccountantService) private readonly _service: AccountantService
  ) {
    this._departmentId = "110";
  }

  @httpGet('/')
  async getAll(
  ) {
    return await this._service.getList();
  }
}
