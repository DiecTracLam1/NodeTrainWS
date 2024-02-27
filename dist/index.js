"use strict";
require("reflect-metadata");
const express = require('express');
const { InversifyExpressServer } = require("inversify-express-utils");
const container = require("./inversify.config");
const app = express();
const port = 3000;
const server = new InversifyExpressServer(container);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
