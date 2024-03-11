import { Container } from "inversify";
import {
  fluentProvide,
  buildProviderModule,
} from "inversify-binding-decorators";
import getDecorators from 'inversify-inject-decorators';

//Entity
import { DepartmentEntity, EmployeeEntity } from "../entity";

// Repository
import {
  EmployeesRepository,
  ItRepository,
  AccountantRepository,
} from "../repository/employees";
import { DepartmentRepository } from "../repository/department";

// Service
import {
  AccountantService,
  EmployeeService,
  ItService,
} from "../service/employees";
import { DepartmentService } from "../service/department";

//Controller
import {
  AccountantController,
  EmployeeController,
  ItController,
} from "../controller/employee";
import { DepartmentController } from "../controller/department";

import CheckValidator from "../middleware/checkValidation";
import { Context } from "../context";

import { TYPES } from "../constant/types";

const container = new Container();

container.bind(TYPES.EmployeeEntity).to(EmployeeEntity)
container.bind(TYPES.DepartmentEntity).to(DepartmentEntity)

//Department
container.bind(DepartmentRepository).toSelf();
container.bind(DepartmentService).toSelf();
container.bind(DepartmentController).toSelf();

// Employee
container.bind(ItRepository).toSelf();
container.bind(ItService).toSelf();
container.bind(ItController).toSelf();

container.bind(AccountantRepository).toSelf();
container.bind(AccountantService).toSelf();
container.bind(AccountantController).toSelf();

container.bind(EmployeesRepository).toSelf();
container.bind(EmployeeService).toSelf();
container.bind(EmployeeController).toSelf();

container.bind(CheckValidator).toSelf();
container.bind<any>(TYPES.Context).toConstantValue(3);
container.bind<any>(TYPES.ContextMiddle).toConstantValue(2)

// const { lazyInject } = getDecorators(container,false);
container.load(buildProviderModule());
// const provideFluent = fluentProvide(container);

// export function ProvideAsSingleton(
//   symbol: symbol.for('Context')
// ): any {
//   return provideFluent(symbol).().done(true);
// }

export { container };
