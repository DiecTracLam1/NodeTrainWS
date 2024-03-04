import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "dotenv/config";
import "./controller/employee";

import { serverConfig, serverErrorConfig, container } from "./config";

const port = process.env.PORT || 3000;
const server = new InversifyExpressServer(container);

server.setConfig(serverConfig);
server.setErrorConfig(serverErrorConfig);

server.build().listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
