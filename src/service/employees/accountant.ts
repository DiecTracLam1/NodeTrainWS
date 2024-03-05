import { inject, injectable } from "inversify";
import { AccountantRepository } from "../../repository/employees";
import { BaseService } from "../../service/base";

@injectable()
export class AccountantService extends BaseService {
  constructor(
    @inject(AccountantRepository)
    private readonly _AccountantRepository: AccountantRepository
  ) {
    super(_AccountantRepository)
  }
}

