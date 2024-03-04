import { inject, injectable } from "inversify";
import { EmployeesRepository } from "../../repository/employees";

@injectable()
export class EmployeeService {
  constructor(
    @inject(EmployeesRepository)
    private readonly _repository: EmployeesRepository
  ) {}

  async getList():Promise<any[]> {
    return await this._repository.getAll();
  }

  async findOne(data:any):Promise<any>{
    return await this._repository.findOne(data)
  }
}
