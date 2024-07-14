const express = require("express");
const router = express.Router();
const accessController = require("../controllers/access.controller");
const passport = require("passport");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  authentication,
  authenticationRefreshToken,
  verifyOtp,
} = require("../auth/authUtils");
//Resetpassword
router.post(
  "/forgot-password",
  verifyOtp,
  asyncHandler(accessController.forgotPassword)
);
router.post("/reset-password", asyncHandler(accessController.resetPassword));
//Login with app
router.post("/send-otp", asyncHandler(accessController.sendOtp));
router.post("/signup", verifyOtp, asyncHandler(accessController.signUp));
router.post("/login", asyncHandler(accessController.login));
//Login & register with google
router.get(
  "/login/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "login",
  })
);
router.get(
  "/signup/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "signup",
  })
);
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.profile = profile;
      next();
    })(req, res, next);
  },
  asyncHandler(accessController.authWithOAuth)
);
//Login with facebook
router.get(
  "/signup/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    state: "signup",
  })
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    state: "login",
  })
);

router.get(
  "/auth/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.profile = profile;
      next();
    })(req, res, next);
  },
  asyncHandler(accessController.authWithOAuth)
);
//Login sau khi đăng nhập bằng google và yêu cầu cài password
router.post("/oauth/login", asyncHandler(accessController.loginWithOAuth));
//getToken
router.post(
  "/refreshToken",
  authenticationRefreshToken,
  asyncHandler(accessController.handlerRefreshToken)
);
router.use(authentication);
router.post("/logout", asyncHandler(accessController.logout));

module.exports = router;
