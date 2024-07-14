const { apiKey, permisstions } = require("../auth/checkAuth");
const accessRouter = require("./access.route");
const { asyncHandler } = require("../utils/asyncHandler");

function route(app) {
  app.use("/api/v1", accessRouter);
}
module.exports = route;
