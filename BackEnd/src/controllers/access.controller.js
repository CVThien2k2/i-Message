const accessService = require("../services/access.service");
const bcrypt = require("bcrypt");
const { OK, CREATED, SuccessResponse } = require("../utils/success.response");

class accessController {
  async login(req, res, next) {
    new SuccessResponse({
      message: "Login success!",
      metadata: await accessService.login(req.body),
    }).send(res);
  }
  async signUp(req, res, next) {
    new CREATED({
      message: "Register OK!",
      metadata: await accessService.signUp(req.body),
    }).send(res);
  }
  async logout(req, res, next) {
    new SuccessResponse({
      message: "Logout success!",
      metadata: await accessService.logout({ keyStore: req.keyStore }),
    }).send(res);
  }
  async handlerRefreshToken(req, res, next) {
    new SuccessResponse({
      message: "Get token success!",
      metadata: await accessService.handlerRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  }
}

module.exports = new accessController();
