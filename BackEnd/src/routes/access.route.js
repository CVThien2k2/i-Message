const express = require("express");
const router = express.Router();
const accessController = require("../controllers/access.controller");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  authentication,
  authenticationRefreshToken,
} = require("../auth/authUtils");

router.post("/signup", asyncHandler(accessController.signUp));
router.post("/login", asyncHandler(accessController.login));

router.post(
  "/getToken",
  authenticationRefreshToken,
  asyncHandler(accessController.handlerRefreshToken)
);
router.use(authentication);
router.post("/logout", asyncHandler(accessController.logout));
module.exports = router;
