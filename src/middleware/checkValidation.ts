import { Request, Response, NextFunction} from "express";
import  bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function checkRole(
  request: Request,
  response: Response,
  next: NextFunction
) {}

export async function checkLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    res.send("Miss authorization");
    res.status(401);
    return;
  } else {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);

    let decode :any;
    try {
      decode = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decode);
    } catch (error:any) {
      res.json(error.message);
      res.status(401);
      return;
    }

    if (decode) {
      const users = await db.User.find({}).toArray();
      const index = users.findIndex((el) => {
        let checkPassword = bcrypt.compare(req.body.password, el.password);
        return decode.email === el.email && checkPassword;
      });

      if (index < 0 ) {
        res.send("User is not existed");
        res.status(401);
        return;
      } else if (index > 0) {
        req["userRole"] = "user";
        next();
      }

    } else {
      res.send("JWT is not valid");
      res.status(401);
      return;
    }
  }
}
