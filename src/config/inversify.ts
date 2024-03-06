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
import {
  results,
  interfaces,
  BaseHttpController,
} from "inversify-express-utils";
import { Context } from "../context";
import {
  fluentProvide,
  buildProviderModule,
} from "inversify-binding-decorators";

import { TYPES } from "../constant/types";

const container = new Container();

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
container.bind<any>(TYPES.Context).toConstantValue(1);


// const provideFluent = fluentProvide(container);

// export function ProvideAsSingleton(
//   symbol: symbol.for('Context')
// ): any {
//   return provideFluent(symbol).().done(true);
// }

export { container };
