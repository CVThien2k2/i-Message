const keyTokenModel = require("../models/keytoken.model");
const { Types } = require("mongoose");
class keyTokenService {
  createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
  findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean();
  };
  removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(id) });
  };
  findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokenUsed: refreshToken });
  };
  deleteKeyById = async (userId) => {
    return await keyTokenModel.deleteOne({
      user: new Types.ObjectId(userId),
    });
  };
  findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken: refreshToken });
  };
  findByIdAndUpdate = async (id, object) => {
    return await keyTokenModel.findByIdAndUpdate(id, object);
  };
}
module.exports = new keyTokenService();
