const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const keyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { verifyJWT } = require("../auth/authUtils");
const {
  BadRequestError,
  AuthFailureError,
} = require("../utils/error.response");
const userService = require("./user.service");

class accessService {
  login = async ({ email, password, refreshToken = null }) => {
    const foundUser = await userModel.findOne({ email });
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
          "name",
          "email",
          "numberPhone",
          "gender",
          "address",
          "avatar",
        ],
        object: foundUser,
      }),
      tokens,
    };
  };
  signUp = async (req) => {
    let password = req.password;
    const email = req.email;
    const name = req.name;
    const numberPhone = req.numberPhone;
    const gender = req.gender;
    let avatar = "";
    if (gender === "female") {
      avatar =
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png";
    }
    let user = await userModel.findOne({ email: email }).lean();
    if (user) {
      throw new BadRequestError("Email already in use");
    }
    user = await userModel.findOne({ numberPhone: numberPhone }).lean();
    if (user) {
      throw new BadRequestError("Number already in use");
    }
    if (!name || !email || !password || !numberPhone) {
      throw new BadRequestError("Email already in use");
    }
    if (!validator.isEmail(email)) {
      throw new BadRequestError("Email already in use");
    }
    if (!validator.isStrongPassword(password)) {
      throw new BadRequestError("Weak password!");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    req.password = password;

    const newUser = await userModel.create(req);
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
            "name",
            "email",
            "numberPhone",
            "gender",
            "address",
            "avatar",
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
          "name",
          "email",
          "numberPhone",
          "gender",
          "address",
          "avatar",
        ],
        object: foundUser,
      }),
      tokens,
    };
  };
}

module.exports = new accessService();
