import { inject, injectable } from "inversify";

import {DepartmentRepository} from "../../repository/department";
import { BaseService } from "../../service/base";


@injectable()
export class DepartmentService extends BaseService {
  constructor(
    @inject(DepartmentRepository)
    private readonly _DepartmentRepository: DepartmentRepository
  ) {
    super(_DepartmentRepository)
  }
}
