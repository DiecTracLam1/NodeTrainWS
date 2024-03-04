import { inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { EmployeeService } from "../../service/employees";

export class LoginController {
  constructor(
    @inject(EmployeeService) private readonly _service: EmployeeService
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    console.log(this)
    const { email, password } = req.body;
    const msgBody = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Missing email or password ",
      });
    try {
      const data = await this._service.findOne({ email });
      const user = data.rows[0];
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
      if (process.env.SECRET_KEY) {
        const accessToken = jwt.sign(msgBody, process.env.SECRET_KEY);
        const userId = user.employee_id;
            // this.context.role = user.role
        return { success: true, accessToken, userId };
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
