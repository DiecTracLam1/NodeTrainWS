import { Container } from "inversify";

import {
  EmployeesRepository,
  ItRepository,
  AccountantRepository,
} from "../repository/employees";
import {
  AccountantService,
  EmployeeService,
  ItService,
} from "../service/employees";
import {
  AccountantController,
  EmployeeController,
  ItController,
} from "../controller/employee";
import CheckValidator from "../middleware/checkValidation";
import { Context } from "../context";
import {
  fluentProvide,
  buildProviderModule,
} from "inversify-binding-decorators";
import getDecorators from 'inversify-inject-decorators';

import { TYPES } from "../constant/types";
import { EmployeeEntity } from "../entity";

const container = new Container();

container.bind(TYPES.EmployeeEntity).to(EmployeeEntity)

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
