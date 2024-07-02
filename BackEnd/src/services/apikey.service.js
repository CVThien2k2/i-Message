const apiKeyModel = require("../models/apiKey.model");
class apiKeyService {
  findById = async (key) => {
    return await apiKeyModel.findOne({ key, status: true }).lean();
  };
}
module.exports = new apiKeyService();
