const accessService = require("../services/access.service");
const bcrypt = require("bcrypt");
const { OK, CREATED, SuccessResponse } = require("../utils/success.response");
const JWT = require("jsonwebtoken");
const { verifyJWT, signJWT } = require("../auth/authUtils");
const {
  NotFoundError,
  AuthFailureError,
  ConflictRequestError,
  BadRequestError,
} = require("../utils/error.response");

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
      metadata: await accessService.signUp({
        user_name: req.data.user_name,
        given_name: req.data.given_name,
        family_name: req.data.family_name,
        gender: req.data.gender,
        doB: req.data.doB,
        password: req.data.password,
        role: "user",
        active: false,
        avatar: req.data.avatar,
        address: req.data.address,
      }),
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
  async authWithOAuth(req, res, next) {
    const state = req.query.state;
    const profile = req.profile;
    if (state === "login") {
      const accountOAuth = await accessService.getOAuthAccountByProvider(
        profile.id
      );
      if (!accountOAuth) {
        res.redirect(
          `${process.env.URL_CLIENT}/not-found-account?state=not-found-account`
        );
      } else {
        const token = await signJWT(
          {
            provider_id: profile.id,
          },
          process.env.PRIVATE_KEY_AUTH
        );
        res.redirect(`${process.env.URL_CLIENT}/login?token=${token}`);
      }
    } else if (state === "signup") {
      let accountOAuth = await accessService.getOAuthAccountByProvider(
        profile.id
      );
      if (accountOAuth) {
        res.redirect(
          `${process.env.URL_CLIENT}/account-registered?state=account-registered`
        );
      } else {
        const accountOAuth = await accessService.signupWithOAuth(profile);
        if (accountOAuth) {
          const token = await signJWT(
            {
              provider_id: accountOAuth.provider_id,
            },
            process.env.PRIVATE_KEY_AUTH
          );
          res.redirect(`${process.env.URL_CLIENT}/login?token=${token}`);
        } else {
          res.redirect(
            `${process.env.URL_CLIENT}/account-registered?state=account-registered`
          );
        }
      }
    }
  }
  async loginWithOAuth(req, res, next) {
    const decoded = verifyJWT(req.body.token, process.env.PRIVATE_KEY_AUTH);
    const { provider_id } = decoded;
    const foundAccount = await accessService.getOAuthAccountByProvider(
      provider_id
    );
    if (!foundAccount) throw new AuthFailureError("Login failed");
    new SuccessResponse({
      message: "Login success!",
      metadata: await accessService.loginWithOAuth(foundAccount),
    }).send(res);
  }
  async forgotPassword(req, res, next) {
    const token = await JWT.sign(
      { user_name: req.data.user_name },
      process.env.PRIVATE_KEY_RESET_PASSWORD,
      {
        expiresIn: "5m",
      }
    );
    new SuccessResponse({
      message: "Verify otp success!",
      metadata: { token: token },
    }).send(res);
  }
  async resetPassword(req, res, next) {
    const { user_name } = await JWT.verify(
      req.body.token,
      process.env.PRIVATE_KEY_RESET_PASSWORD,
      {
        expiresIn: "5m",
      }
    );
    const account = await accessService.resetPassword(
      user_name,
      req.body.password
    );
    new SuccessResponse({
      message: "Reset password success!",
      metadata: account,
    }).send(res);
  }
  async sendOtp(req, res, next) {
    const token = await accessService.sendOtp(req.body);
    new SuccessResponse({
      message: "OTP has been sent!",
      metadata: { token: token },
    }).send(res);
  }
}

module.exports = new accessController();
