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
import { AccountantController, EmployeeController, ItController } from "../controller/employee";
import CheckValidator from "../middleware/checkValidation";

const container = new Container();

container.bind(ItRepository).toSelf();
container.bind(ItService).toSelf();
container.bind(ItController).toSelf()

container.bind(AccountantRepository).toSelf();
container.bind(AccountantService).toSelf();
container.bind(AccountantController).toSelf()

container.bind(EmployeesRepository).toSelf();
container.bind(EmployeeService).toSelf();
container.bind(EmployeeController).toSelf();

container.bind(CheckValidator).toSelf()

export { container };
