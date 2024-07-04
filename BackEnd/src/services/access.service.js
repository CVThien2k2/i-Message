const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const keyTokenService = require("./keyToken.service");
const { createTokenPair, hashString } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { verifyJWT } = require("../auth/authUtils");
const {
  BadRequestError,
  AuthFailureError,
} = require("../utils/error.response");
const userService = require("./user.service");

class accessService {
  login = async ({ email, password, refreshToken = null }) => {
    const foundUser = await userService.findUserByEmail({ email: email });
    if (!foundUser) {
      throw new BadRequestError("User not registered!");
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) throw new AuthFailureError("Authentication error");
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: foundUser._id, email },
      privateKey,
      publicKey
    );
    await keyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: foundUser._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "givenName",
          "familyName",
          "numberPhone",
          "gender",
          "address",
          "avatar",
          "doB",
          "typeLogin",
        ],
        object: foundUser,
      }),
      tokens,
    };
  };
  signUp = async ({
    email,
    numberPhone = null,
    givenName,
    familyName,
    gender = null,
    address = null,
    avatar = null,
    doB = null,
    password = null,
    typeLogin,
  }) => {
    let user = await userService.findUserByEmail({ email: email });
    if (user) {
      throw new BadRequestError("Email already in use");
    }
    if (!typeLogin && numberPhone)
      user = await userService.findUserByNumber({ numberPhone: numberPhone });
    if (user) {
      throw new BadRequestError("Number already in use");
    }
    if (!validator.isEmail(email)) {
      throw new BadRequestError("Email error");
    }
    if (password) {
      password = hashString(password);
    }
    const newUser = await userModel.create({
      email,
      numberPhone,
      givenName,
      familyName,
      gender,
      address,
      avatar,
      doB,
      password,
      typeLogin,
    });

    if (newUser) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      const keyStore = await keyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
        privateKey,
      });
      if (!keyStore) {
        throw new BadRequestError("keyStore error");
      }
      const tokens = await createTokenPair(
        { userId: newUser._id, email },
        privateKey,
        publicKey
      );
      return {
        user: getInfoData({
          fields: [
            "_id",
            "email",
            "givenName",
            "familyName",
            "numberPhone",
            "gender",
            "address",
            "avatar",
            "doB",
            "typeLogin",
          ],
          object: newUser,
        }),
        tokens,
      };
    }
  };
  logout = async ({ keyStore }) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };
  handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;
    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await keyTokenService.deleteKeyById(userId);
      throw new BadRequestError("Something wrong happen! Please relogin");
    }
    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("User not registered");
    }
    const foundUser = await userService.findUserByEmail({ email });
    if (!foundUser) {
      throw new AuthFailureError("User not registered");
    }
    const tokens = await createTokenPair(
      { userId, email },
      keyStore.privateKey,
      keyStore.publicKey
    );
    await keyTokenService.findByIdAndUpdate(keyStore._id, {
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });
    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "givenName",
          "familyName",
          "numberPhone",
          "gender",
          "address",
          "avatar",
          "doB",
          "typeLogin",
        ],
        object: foundUser,
      }),
      tokens,
    };
  };
  getUserByEmail = async (email) => {
    return await userService.findUserByEmail({ email: email });
  };
  loginWithGoogle = async (user) => {
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: user._id, email: user.email },
      privateKey,
      publicKey
    );
    await keyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: user._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "givenName",
          "familyName",
          "numberPhone",
          "gender",
          "address",
          "avatar",
          "doB",
          "typeLogin",
        ],
        object: user,
      }),
      tokens,
    };
  };
  generatePassword = async ({ token, password }) => {
    const { email, userId } = verifyJWT(
      token,
      process.env.PRIVATE_KEY_GENERATE_PASS
    );
    const foundUser = await userService.findUserByEmail({ email: email });
    if (!foundUser) throw new BadRequestError("User not registered!");
    if (foundUser.password)
      throw new BadRequestError("Password is already in place");
    if (!password) throw new BadRequestError("Password is empty");
    const user = await userService.findByIdAndUpdate(userId, {
      password: await hashString(password),
      active: true,
    });
    if (!user) throw new BadRequestError("Error generate password");
    return user;
  };
}

module.exports = new accessService();
