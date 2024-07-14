"use strict";
const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  AuthFailureError,
  NotFoundError,
  BadRequestError,
} = require("../utils/error.response");
const { findByUserId } = require("../services/keyToken.service");
const bcrypt = require("bcrypt");
const { getLastOtpByUserName } = require("../services/otp.service");
const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
  REFRESH_TOKEN: "x-rfresh-key",
};
const createTokenPair = async (payload, privateKey, publicKey) => {
  try {
    //accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "15m",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "2d",
    });
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify::`, err);
      } else {
        console.log(`decode verify::`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};
const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("User not login!");
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid token");
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid User");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw new AuthFailureError("Verify error with token!");
  }
});
const authenticationRefreshToken = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid userId");
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");
  if (!req.headers[HEADER.REFRESH_TOKEN])
    throw new AuthFailureError("Invalid refresh token");
  try {
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid User");
    req.keyStore = keyStore;
    req.user = decodeUser;
    req.refreshToken = refreshToken;
    return next();
  } catch (error) {
    await keyStore.deleteOne({ _id: keyStore._id });
    throw new AuthFailureError("Fresh token has expired, please log in again!");
  }
});

const verifyJWT = (token, keySecret) => {
  return JWT.verify(token, keySecret);
};
const signJWT = (payload, privateKey) => {
  return JWT.sign(payload, privateKey, {
    expiresIn: "1d",
  });
};
const hashString = async (string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(string, salt);
};
const verifyOtp = asyncHandler(async (req, res, next) => {
  const otp = req.body.otp;
  if (!otp) throw new AuthFailureError("Invalid otp");
  const data = await JWT.verify(req.body.token, process.env.PRIVATE_KEY_OTP, {
    expiresIn: "5m",
  });
  if (!data) throw new BadRequestError("Request time out!");
  const otpKey = await getLastOtpByUserName({ user_name: data.user_name });
  if (!otpKey) throw new AuthFailureError("Otp not found!");
  const isOtp = await bcrypt.compare(otp, otpKey.otp);
  if (!isOtp) throw new AuthFailureError("Authentication otp error");
  await otpKey.deleteOne({ user_name: data.user_name });
  req.data = data;
  return next();
});
module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
  authenticationRefreshToken,
  hashString,
  signJWT,
  verifyOtp,
};
