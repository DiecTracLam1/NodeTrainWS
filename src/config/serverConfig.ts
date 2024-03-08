import { Application, Response, Request, NextFunction } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");

import routes from "../routes";
import { connectDb } from "../model/connect";

export const serverConfig = async (app: Application) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/", routes);

  await connectDb();
};

export const serverErrorConfig = (app: Application) => {
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    res.status(err.status)
    res.send(err.message)
  });
};
