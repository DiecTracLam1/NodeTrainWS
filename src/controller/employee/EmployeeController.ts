import { inject } from "inversify";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
  next,
  httpPost,
} from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AccountantService } from "../../service/employees";

@controller("/employees")
export class EmployeeController implements interfaces.Controller {
  constructor(
    @inject(AccountantService) private readonly _service: AccountantService
  ) {}

  async getAll(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const list = await this._service.getList();
      res.json(list.rows);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Missing email or password ",
      });

    try {
      const user = await db.User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      }

      let checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      }

      const accessToken = jwt.sign(msgBody, process.env.SECRET_KEY);
      const userId = user._id;
      return res.json({ success: true, accessToken, userId });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
