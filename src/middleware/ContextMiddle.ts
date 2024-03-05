import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { EmployeeController } from "../controller/employee/EmployeeController";
import { Context } from "../context";
import { container } from "../config";

@injectable()
export default class ContextMiddleware {
  private _context: any;
  constructor() {
    this._context = new Context(container);
  //   this._context._req = {
  //     query,
  //     headers,
  //     body
  //   }
  }
}
