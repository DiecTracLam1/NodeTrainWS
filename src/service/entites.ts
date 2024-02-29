import { injectable, inject } from "inversify";
import express from "express";
import { Weapon, ThrowableWeapon, Warrior } from "../interface";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  request,
  queryParam,
  response,
  requestParam,
  next,
} from "inversify-express-utils";
import { TYPES } from "../constant/types";

// @controller("/foo")
// export class FooController implements interfaces.Controller {
//   constructor(@inject(TYPES.Weapon) private fooService: any) {}

//   @httpGet("/")
//   private index(
//     @request() req: express.Request,
//     @response() res: express.Response,
//     @next() next: express.NextFunction
//   ): string {
//     return this.fooService.get(req.query.id);
//   }

//   @httpGet("/")
//   private list(
//     @queryParam("start") start: number,
//     @queryParam("count") count: number
//   ): string {
//     return this.fooService.get(start, count);
//   }

//   @httpPost("/")
//   private async create(
//     @request() req: express.Request,
//     @response() res: express.Response
//   ) {
//     try {
//       await this.fooService.create(req.body);
//       res.sendStatus(201);
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   }

//   @httpDelete("/:id")
//   private delete(
//     @requestParam("id") id: string,
//     @response() res: express.Response
//   ): Promise<void> {
//     return this.fooService
//       .delete(id)
//       .then(() => res.sendStatus(204))
//       .catch((err: Error) => {
//         res.status(400).json({ error: err.message });
//       });
//   }
// }

@controller("/")
export class Home implements interfaces.Controller {
  @httpGet("/")
  private index(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() next: express.NextFunction
  ) {
    return res.send("Home pages");
  }
}

@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@injectable()
class Shuriken  {
  public throw() {
    return "hit!";
  }
}

@injectable()
class Ninja {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(Katana) katana: Weapon,
    @inject(Shuriken) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

export { Ninja ,Katana, Shuriken };
