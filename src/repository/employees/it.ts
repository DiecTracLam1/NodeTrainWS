import { inject, injectable } from "inversify";

import { TYPES } from "../../constant/types";
import { Employees } from "../../entity";
import { BaseRepository } from "../base";
import { db } from "../../database/connect";

@injectable()
export class ItRepository extends BaseRepository {
  constructor(@inject(TYPES.EmployeeEntity) private _employeeEntity: any) {
    super(Employees);
  }

  getAll = async (query = {}) => {
    try {
      // const [data, count] = await this.getEntity().findAndCount({
      //   take: 10,
      //   relations: [
      //     "jobs",
      //     "department.locations",
      //     "manager.jobs",
      //     "manager.department.locations",
      //   ],
      //   where: (qb: any) => {
      //     qb.where(`department_id : 60`);
      //   },
      // });
      // const response = { data, total: count };

      // const join = await this.getEntity()
      //   .createQueryBuilder("employees")
      //   .leftJoinAndSelect("employees.jobs", "jobs")
      //   .leftJoinAndSelect("employees.department", "departments")
      //   .leftJoinAndSelect("employees.manager", "manager")
      //   .innerJoinAndSelect("departments.locations", "department.locations")
      //   .leftJoinAndSelect("employees.assistant", "assistant")
      //   .where(`employees.department_id = 60 ${query}`)
      //   .limit(10);

      // const data = await join.getMany();
      // // const total = await join.getCount();
      // const response = { data, total };

      const response = await db.manager.query(
        `SELECT * from employees e1 
        left join departments d on e1.department_id = d.department_id 
        left join ( select * from employees) e2 on e1.employee_id = e2.manager_id
        where e1.department_id = 60 `
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
