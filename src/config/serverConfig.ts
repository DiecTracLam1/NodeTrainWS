import { Application, Response, Request, NextFunction } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");

import routes from "../routes";
import client from "../model/connect";

export const serverConfig = async (app: Application) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/", routes);

  await client.connect((err: any) => {
    if (err) console.log(err);
    else console.log("Connection successful");
  });
};

export const serverErrorConfig = (app: Application) => {
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err.message);
  });
};
