import { inject, injectable } from "inversify";

import { ItRepository } from "../../repository/It";

@injectable()
export class ItService {
  constructor(
    @inject(ItRepository) private readonly _repository: ItRepository
  ) {}

  async getList() {
    return await this._repository.getAll();
  }
}
