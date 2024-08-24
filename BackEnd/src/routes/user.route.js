const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { asyncHandler } = require("../auth/checkAuth");
router.get("/find/:userId", userController.findUser);
router.get("/", userController.getUser);
router.post("/friends", userController.getFriends);
router.post("/online/", userController.updateOnline);
router.post("/profile", userController.updateProfile);
module.exports = router;

