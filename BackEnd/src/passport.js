const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_ULR
        ? `${process.env.CALL_BACK_ULR}/api/v1/auth/google/callback`
        : `/api/v1/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.CALL_BACK_ULR
        ? `${process.env.CALL_BACK_ULR}/api/v1/auth/facebook/callback`
        : `/api/v1/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email", "gender", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
