import { Container } from "inversify";
// import { EmployeeController } from "../controller";
// import { AccountantService } from "../service/employees";
import {EmployeesRepository , ItRepository , AccountantRepository} from "../repository/employees"
import {AccountantService , EmployeeService , ItService} from "../service/employees";
// import { ItService } from "../service/employees";

const container = new Container();

container.bind(ItRepository).toSelf()
container.bind(ItService).toSelf()

container.bind(AccountantRepository).toSelf()
container.bind(AccountantService).toSelf()

container.bind(EmployeesRepository).toSelf();
container.bind(EmployeeService).toSelf();


export { container };
