import { inject, injectable } from "inversify";
import { EmployeesRepository } from "../../repository/employees";
import { BaseService } from "../../service/base";

@injectable()
export class EmployeeService extends BaseService {
  constructor(
    @inject(EmployeesRepository)
    private readonly _EmployeeRepository: EmployeesRepository
  ) {
    super(_EmployeeRepository)
  }
}
