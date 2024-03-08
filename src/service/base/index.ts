import { injectable } from "inversify";

@injectable()
export class BaseService {
  private readonly _repository;
  constructor(repository: any) {
    this._repository = repository;
  }

  async getList(): Promise<any[]> {
    return await this._repository.getAll();
  }

  async findOne(data: any): Promise<any> {
    console.log("findOne : " , await this._repository.findOne(data))
    return await this._repository.findOne(data);
  }
}
