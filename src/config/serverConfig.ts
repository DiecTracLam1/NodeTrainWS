import { Application , Response , Request , NextFunction } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");

import routes from "../routes";
import client from "../model/connect";

export const serverConfig = async(app: Application) => {
  app.use("/", routes);
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());

  await client.connect((err: any) => {
    if (err) console.log(err);
    else console.log("Connection successful");
  });




  
//   const res = await client.query('SELECT * from departments')
//   console.log(res.rows)

};

export const serverErrorConfig = (app: Application) => {
//   app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
//     if (err && err instanceof BaseException) {
//       return res.status(err.statusCode).json(err);
//     }

//     if (err) {
//       return res.status(500).json(new InternalServerException(err.message));
//     }

//     next();
//   });
};
