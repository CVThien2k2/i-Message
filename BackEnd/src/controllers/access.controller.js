const accessService = require("../services/access.service");
const bcrypt = require("bcrypt");
const { OK, CREATED, SuccessResponse } = require("../utils/success.response");
const JWT = require("jsonwebtoken");
const { verifyJWT, signJWT } = require("../auth/authUtils");
const { NotFoundError } = require("../utils/error.response");

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
        email: req.body.email,
        numberPhone: req.body.numberPhone,
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        gender: req.body.gender,
        doB: req.body.doB,
        password: req.body.password,
        typeLogin: "imessage",
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
  async authWithGoogle(req, res, next) {
    const state = req.query.state;
    const profile = req.profile;
    if (state === "login") {
      const user = await accessService.getUserByEmail(profile.emails[0].value);
      if (!user) {
        res.redirect(
          `${process.env.URL_CLIENT}/not-found-account?state=not-found-account`
        );
      } else {
        const token = await signJWT(
          { email: user.email },
          process.env.PRIVATE_KEY_AUTH
        );
        res.redirect(`${process.env.URL_CLIENT}/login?token=${token}`);
      }
    } else if (state === "signup") {
      const foundUser = await accessService.getUserByEmail(
        profile.emails[0].value
      );
      if (foundUser) {
        res.redirect(
          `${process.env.URL_CLIENT}/account-registered?state=account-registered`
        );
      } else {
        const { user } = await accessService.signUp({
          email: profile.emails[0].value,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          avatar: profile.photos[0].value,
          typeLogin: "google",
        });
        if (user) {
          const token = await signJWT(
            { email: user.email },
            process.env.PRIVATE_KEY_AUTH
          );
          res.redirect(`${process.env.URL_CLIENT}/login?token=${token}`);
        }
      }
    }
  }
  async loginWithGoogle(req, res, next) {
    const decoded = verifyJWT(req.body.token, process.env.PRIVATE_KEY_AUTH);
    const { email } = decoded;
    if (!email) throw new AuthFailureError("Login failed");
    const foundUser = await accessService.getUserByEmail(email);
    if (!foundUser) throw new AuthFailureError("Login failed");
    if (foundUser.password) {
      new SuccessResponse({
        message: "Login success!",
        metadata: await accessService.loginWithGoogle(foundUser),
      }).send(res);
    } else {
      const token = await signJWT(
        { email: email, userId: foundUser._id },
        process.env.PRIVATE_KEY_GENERATE_PASS
      );
      new SuccessResponse({
        message: "Password not initialized",
        code: 404,
        status: "error",
        metadata: { token: token },
      }).send(res);
    }
  }
  async generatePassword(req, res, next) {
    const user = await accessService.generatePassword(req.body);
    new SuccessResponse({
      message: "Login success!",
      metadata: await accessService.login({
        email: user.email,
        password: req.body.password,
      }),
    }).send(res);
  }
}

module.exports = new accessController();
