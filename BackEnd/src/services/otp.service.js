const otpModel = require("../models/otp.model");
const bcrypt = require("bcrypt");
class otpService {
  createOtp = async ({ user_name, otp }) => {
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(otp, salt);
    return await otpModel.create({ user_name: user_name, otp: hashOtp });
  };
  getLastOtpByUserName = async ({ user_name }) => {
    const otps = await otpModel.find({ user_name: user_name });
    return otps[otps.length - 1];
  };
}
module.exports = new otpService();
