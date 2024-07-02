const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OK, CREATED } = require("../utils/success.response");
require("dotenv").config();

class userController {
  async findUser(req, res) {
    try {
      const userId = req.params.userId;

      var user = await userService.getUser(userId);
      user = { ...user.toObject(), password: undefined };
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getUser(req, res) {
    try {
      var users = await userService.getAllUsers();
      const usersWithoutPasswords = users.map((user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });
      res.status(200).json(usersWithoutPasswords);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getFriends(req, res) {
    try {
      let user_id = req.body.user_id;
      var friends = await userService.getUser(user_id);

      res.status(200).json(friends);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async updateOnline(req, res) {
    try {
      let user_id = req.body.user_id;
      var response = await userService.updateOnline(user_id);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async updateProfile(req, res) {
    try {
      console.log(req.body);
      const user_id = req.body._id;
      const name = req.body.name;
      const numberPhone = req.body.numberPhone;
      const address = req.body.address;
      const avatar = req.body.avatar;
      const email = req.body.email;
      var response = await userService.updateProfile(
        user_id,
        name,
        numberPhone,
        address,
        avatar,
        email
      );

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new userController();
