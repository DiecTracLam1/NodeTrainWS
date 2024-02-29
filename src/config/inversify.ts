import { Container } from "inversify";
import { TYPES } from "../constant/types";
import { Warrior, Weapon, ThrowableWeapon } from "../interface";
import { Katana, Shuriken, Ninja } from "../service/entites";
// import { EmployeeController } from "../controller";
import { Accountant } from "../service/employees/accountant";
import { ItRepository } from "../repository/It";
import { ItService } from "../service/employees/It";

const container = new Container();

container.bind<Katana>(Katana).toSelf();
container.bind(Ninja).toSelf();
container.bind(Shuriken).toSelf();

container.bind(Accountant).toSelf();
container.bind(ItService).toSelf();
container.bind(ItRepository).toSelf();

export { container };
