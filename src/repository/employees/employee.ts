import { inject, injectable } from "inversify";
import { BaseRepository } from "../../repository/base";
import { TYPES } from "../../constant/types";
import { Employees } from "../../entity";

@injectable()
export class EmployeesRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private _employeeEntity: any) {
    super(Employees);
  }
}
