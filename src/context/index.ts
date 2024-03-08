import { fluentContext } from "../constant";
import { TYPES } from "../constant/types";
import { injectable } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

class Context {
  public _container: any;
  public _req!: any;
  private _user:any

  public constructor(container: any , req :any ) {
    this._container = container;
    this._req = req;
  }

  public getUser(){
    return this._user
  }

  public setUser(user:any){
    this._user = user;
  }
}

export { Context };
