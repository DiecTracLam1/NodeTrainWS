import { Container } from "inversify";
import { TYPES } from "./src/constant/types";
import { Warrior, Weapon, ThrowableWeapon } from "./src/interface";
import { Ninja, Katana, Shuriken } from "./src/service/entites";

const container = new Container();

container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind(TYPES.Weapon).to(Katana);
container.bind(TYPES.ThrowableWeapon).to(Shuriken);



export default container;
