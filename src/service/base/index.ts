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
    return await this._repository.findOne(data);
  }

  async getById(id:string): Promise<any> {
    return await this._repository.getById(id)
  }

  async store(data:any){
    return await this._repository.store(data)
  }

  async delete(id:string){
    return await this._repository.delete(id)
  }

  async update(id:string , data:any) {
    return await this._repository.update(id, data)
  }
}
