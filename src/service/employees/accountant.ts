import { inject, injectable } from "inversify";
import { AccountantRepository } from "../../repository/employees";

@injectable()
export class AccountantService {
  constructor(
    @inject(AccountantRepository)
    private readonly _repository: AccountantRepository
  ) {}

  async getList() {
    return await this._repository.getAll();
  }
}
