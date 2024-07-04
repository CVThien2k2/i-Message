const express = require("express");
const router = express.Router();
const accessController = require("../controllers/access.controller");
const passport = require("passport");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  authentication,
  authenticationRefreshToken,
} = require("../auth/authUtils");

//Login with app
router.post("/signup", asyncHandler(accessController.signUp));
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
  asyncHandler(accessController.authWithGoogle)
);

router.post("/login/google", asyncHandler(accessController.loginWithGoogle));
router.post(
  "/generate-password/",
  asyncHandler(accessController.generatePassword)
);

router.post(
  "/getToken",
  authenticationRefreshToken,
  asyncHandler(accessController.handlerRefreshToken)
);
router.use(authentication);
router.post("/logout", asyncHandler(accessController.logout));

module.exports = router;
