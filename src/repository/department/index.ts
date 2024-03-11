import { inject, injectable } from "inversify";
import { BaseRepository } from "../../repository/base";
import { TYPES } from "../../constant/types";
import { DepartmentEntity } from "../../entity";

@injectable()
export class DepartmentRepository extends BaseRepository {
  constructor(@inject(TYPES.DepartmentEntity) private _departmentEntity: any) {
    super(DepartmentEntity);
  }
}
