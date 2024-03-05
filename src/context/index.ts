import { request, response } from "express";

class Context {
  public _container: any;
  public _req!: any;


  public constructor(container: any) {
    this._container = container;
    this._req = request;

  }
}

export { Context };
