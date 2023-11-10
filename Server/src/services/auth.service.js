const userModel = require("../models/user.model");
class authService {
    createUser = async (user) => {
        return await userModel.create(user);
    };
    getAllUsers= async () => {
        return await userModel.find();
      };
}
module.exports = new authService;