const { apiKey, permisstions } = require("../auth/checkAuth");
const accessRouter = require("./access.route");
const { asyncHandler } = require("../utils/asyncHandler");

function route(app) {
  app.use("/api/v1", accessRouter);
}
module.exports = route;
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get user data
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *       401:
 *         description: Unauthorized
 */
