import { injectable, inject } from "inversify";

@injectable()
export default class CEmployee {
  private _id: string;
  private _name: string;
  private _salary: number;

  public constructor(
    @inject("string") id: string,
    @inject("string") name: string,
    @inject("number") salary: number
  ) {
    this._id = id;
    this._name = name;
    this._salary = salary;
  }

  public setId(id: string) {
    this._id = id;
  }

  public setName(name: string) {
    this._name = name;
  }

  public setSalary(salary: number) {
    this._salary = salary;
  }

  public getId() {
    return this._id;
  }

  public getName() {
    return this._name;
  }

  public getSalary() {
    return this._salary;
  }
}
