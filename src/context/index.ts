import { injectable } from "inversify";

@injectable()
class Context {
  public _container: any;
  public _req!: any;
  public _res!: any;
  private _user:any

  public constructor(container: any , req :any , res:any) {
    this._container = container;
    this._req = req;
    this._res = res;
  }

  public getUser(){
    return this._user
  }

  public setUser(user:any){
    this._user = user;
  }
}

export { Context };
