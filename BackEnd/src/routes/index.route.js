const { apiKey, permisstions } = require("../auth/checkAuth");
const userRouter = require("./user.route");
const groupRouter = require("./group.route");
const messageRouter = require("./message.route");
const accessRouter = require("./access.route");
const { asyncHandler } = require("../utils/asyncHandler");

function route(app) {
  // app.use(asyncHandler(apiKey));
  // app.use(permisstions("0000"));

  app.use("/api/v1", accessRouter);
  app.use("/auth", userRouter);
  app.use("/group", groupRouter);
  app.use("/message", messageRouter);
}
module.exports = route;
