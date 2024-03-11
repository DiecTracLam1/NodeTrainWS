import { injectable } from "inversify";
import { db } from "../../model/connect";
import { EmployeeEntity } from "../../entity";
import { IEmployees } from "../../interface/iEmployees";

@injectable()
export class BaseRepository {
  private _entity: any;
  constructor(entity: any) {
    this._entity = db.manager.getRepository(entity);
  }

  getEntity = () => {
    return this._entity;
  };

  getAll = async () => {
    try {
      const query = await this._entity.find({
        take: 10,
      });
      return query;
    } catch (err) {
      console.log(err);
    }
    return "";
  };

  getById = async (id: string): Promise<any> => {
    try {
      const query = await this._entity.findOne({
        where: {
          id,
        },
      });
      return query;
    } catch (err: any) {}
  };

  store = async (data: any) => {
    try {
      this._entity.save(data);
      return true
    } catch (err) {
      console.log(err);
    }
  };

  delete = async (id: any) => {
    try {
      this._entity.delete({ id });
      return true
    } catch (err) {
      console.log(err);
    }
  };

  update = async (id: String, data: any) => {
    return await this._entity.update({ id }, { ...data });
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
