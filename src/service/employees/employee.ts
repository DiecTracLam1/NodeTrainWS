import { inject, injectable } from "inversify";
import { EmployeesRepository } from "../../repository/employees";

@injectable()
export class EmployeeService {
  constructor(
    @inject(EmployeesRepository)
    private readonly _repository: EmployeesRepository
  ) {}

  async getList() {
    return await this._repository.getAll();
  }
}
