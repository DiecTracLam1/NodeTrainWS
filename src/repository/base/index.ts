import { injectable } from "inversify";
import { db } from "../../model/connect";
import { EmployeeEntity, Location } from "../../entity";
import { IEmployees } from "../../interface/iEmployees";

@injectable()
export class BaseRepository {
  private _entity: any;
  constructor(entity: any) {
    this._entity = db.manager.getRepository(entity);
  }

  getAll = async () => {
    try {
      const query = await this._entity.find(this._entity);
      return query;
    } catch (err) {
      console.log(err);
    }
    return "";
  };

  getById = async (id: string): Promise<any> => {
    try {
      let a: any = { id };
      const query = await this._entity.findOne({
        ...a,
      });
    } catch (err) {}
  };

  store = async (data: any) => {
    return this._entity.save(data);
  };

  delete = async (id: String) => {
    return this._entity.createQueryBuilder().delete().where("id = :id", { id });
  };

  update = async (id: String, data: any) => {
    return await this._entity
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where("id = :id", { id })
      .excute();
  };

  findOne = async (data: any) => {
    const query = await this._entity.findOne({
      where: {
        ...data,
      },
    });
    return query;
  };
}
