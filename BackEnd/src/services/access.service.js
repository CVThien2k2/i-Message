const {
  userModel,
  oAuthAcountModel,
  registerAcountModel,
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const keyTokenService = require("./keyToken.service");
const { createTokenPair, hashString } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { verifyJWT } = require("../auth/authUtils");
const transporter = require("../utils/mailer");
const OtpGenerator = require("otp-generator");
const {
  BadRequestError,
  AuthFailureError,
  ConflictRequestError,
} = require("../utils/error.response");
const userService = require("./user.service");
const otpService = require("./otp.service");
const sendEmail = require("../utils/mailer");
const sendSMS = require("../utils/sms");

class accessService {
  login = async ({ user_name, password }) => {
    const foundAccount = await registerAcountModel
      .findOne({ user_name: user_name })
      .populate("user")
      .lean();
    if (!foundAccount) {
      throw new BadRequestError("User name not registered!");
    }
    const isValidPassword = await bcrypt.compare(
      password,
      foundAccount.password
    );
    if (!isValidPassword) throw new AuthFailureError("Authentication error");
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { user_name: foundAccount.user_name, userId: foundAccount.user._id },
      privateKey,
      publicKey
    );
    await keyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: foundAccount.user._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "given_name",
          "family_name",
          "number_phone",
          "gender",
          "address",
          "avatar",
          "doB",
        ],
        object: foundAccount.user,
      }),
      tokens,
    };
  };
  signUp = async ({
    user_name,
    password,
    given_name,
    family_name,
    gender = null,
    address = null,
    avatar = null,
    doB = null,
    email = null,
    number_phone = null,
    role,
    active,
  }) => {
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_name) &&
      !/^(?:\+84|84|0[3-9])\d{8,9}$/.test(user_name)
    ) {
      throw new BadRequestError("Invalid email or phone number.");
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_name)) email = user_name;
    else number_phone = user_name;
    let user = await registerAcountModel
      .findOne({ user_name: user_name })
      .populate("user")
      .lean();
    if (user) {
      throw new BadRequestError("Email or phone number already in use.");
    }
    password = await hashString(password);
    const newUser = await userModel.create({
      email: email,
      number_phone: number_phone,
      given_name: given_name,
      family_name: family_name,
      gender: gender,
      address: address,
      avatar: avatar,
      doB: doB,
      role: role,
      active: active,
    });
    if (!newUser) {
      throw new Error("Error creating user");
    }
    const account = await registerAcountModel.create({
      user_name: user_name,
      password: password,
      user: newUser.id,
    });
    if (!account) {
      await newUser.deleteOne();
      throw new Error("Error creating register account");
    }

    //Tạo khóa
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { user_name: account.user_name, userId: newUser._id },
      privateKey,
      publicKey
    );
    const keyStore = await keyTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });
    if (!keyStore) {
      throw new BadRequestError("keyStore error");
    }
    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "given_name",
          "family_name",
          "number_phone",
          "gender",
          "address",
          "avatar",
          "doB",
        ],
        object: newUser,
      }),
      tokens,
    };
  };
  logout = async ({ keyStore }) => {
    const delKey = await keyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };
  handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, user_name } = user;
    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await keyTokenService.deleteKeyById(userId);
      throw new BadRequestError("Something wrong happen! Please relogin");
    }
    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("Invalid refresh token");
    }
    const foundAccount = await userService.findAccountByUserName(user_name);
    if (!foundAccount) {
      throw new AuthFailureError("User not registered");
    }
    const tokens = await createTokenPair(
      { userId, user_name },
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
        ],
        object: foundAccount.user,
      }),
      tokens,
    };
  };
  getOAuthAccountByProvider = async (provider_id) => {
    return await oAuthAcountModel
      .findOne({ provider_id: provider_id })
      .populate("user")
      .lean();
  };
  loginWithOAuth = async (account) => {
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { user_name: account.user_name, userId: account.user._id },
      privateKey,
      publicKey
    );
    await keyTokenService.createKeyToken({
      publicKey,
      privateKey,
      userId: account.user._id,
      refreshToken: tokens.refreshToken,
    });
    return {
      user: getInfoData({
        fields: [
          "_id",
          "email",
          "given_name",
          "family_name",
          "number_phone",
          "gender",
          "address",
          "avatar",
          "doB",
        ],
        object: account.user,
      }),
      tokens,
    };
  };
  signupWithOAuth = async (profile) => {
    const newUser = await userModel.create({
      email: profile.emails[0].value,
      number_phone: null,
      given_name: profile.name.givenName,
      family_name: profile.name.familyName,
      gender: "unknow",
      address: null,
      avatar: profile.photos[0].value,
      doB: null,
      role: "user",
      active: "true",
    });
    if (!newUser) {
      throw new Error("Error creating user");
    }
    const account = await oAuthAcountModel.create({
      type: profile.provider,
      provider_id: profile.id,
      user: newUser._id,
    });
    return account;
  };
  sendOtp = async (data) => {
    const user_name = data.user_name;
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_name) &&
      !/^(?:\+84|84|0[3-9])\d{8,9}$/.test(user_name)
    ) {
      throw new BadRequestError("Invalid email or phone number.");
    }
    const account = await registerAcountModel
      .findOne({ user_name: user_name })
      .populate("user")
      .lean();
    if (data.type == "signup") {
      if (account) throw new ConflictRequestError("User name is use!");
    } else if (data.type == "forgot-password") {
      if (!account) throw new BadRequestError("User name not found!");
    } else {
      throw new BadRequestError("Type not found!");
    }
    const otp = OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const newOtp = await otpService.createOtp({
      user_name: user_name,
      otp: otp,
    });
    const token = await JWT.sign(data, process.env.PRIVATE_KEY_OTP, {
      expiresIn: "5m",
    });
    if (newOtp) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_name)) {
        sendEmail(user_name, otp);
      } else {
        sendSMS(`+${user_name}`, otp);
      }
    } else {
      throw new BadRequestError("Server Error!");
    }
    return token;
  };
  reSendOtp = async (token) => {
    const data = await JWT.verify(token, process.env.PRIVATE_KEY_OTP, {
      expiresIn: "5m",
    });
    const otp = OtpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const newOtp = await otpService.createOtp({
      user_name: data.user_name,
      otp: otp,
    });
    if (newOtp) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_name)) {
        sendEmail(data.user_name, otp);
      } else {
        sendSMS(`+${data.user_name}`, otp);
      }
    } else {
      throw new BadRequestError("Server Error!");
    }
    return token;
  };
  resetPassword = async (user_name, password) => {
    const hashedPassword = await hashString(password);
    const account = registerAcountModel.updateOne(
      { user_name: user_name },
      { $set: { password: hashedPassword } }
    );
    return account;
  };
}

module.exports = new accessService();
