"use strict";
const accessRouter = require("./access.route");

function route(app) {
  app.use("/api/v1", accessRouter);
}
module.exports = route;
