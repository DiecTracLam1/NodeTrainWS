import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import  'dotenv/config'

import container from "../inversify.config";

const port = process.env.PORT || 3000;
const server = new InversifyExpressServer(container);

server.build().listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
