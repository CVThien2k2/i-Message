const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const UserSchema = new Schema(
  {
    email: { type: String },
    number_phone: { type: Number },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other", "unknow"],
      default: "unknow",
    },
    address: { type: Array },
    avatar: { type: String },
    doB: { type: Number },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);
const RegisterAcountSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "Register_Acount", timestamps: true }
);
const OAuthAcountSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["google", "facebook"] },
    provider_id: { type: String, required: true, unique: true },
  },
  { collection: "OAuth_Acount", timestamps: true }
);

module.exports = {
  userModel: model(DOCUMENT_NAME, UserSchema),
  registerAcountModel: model("Register_Acounts", RegisterAcountSchema),
  oAuthAcountModel: model("OAuth_Acounts", OAuthAcountSchema),
};
