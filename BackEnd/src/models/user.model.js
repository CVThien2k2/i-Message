const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const UserSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    numberPhone: { type: Number },
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    gender: { type: String, default: "unknow" },
    address: { type: String },
    avatar: { type: String },
    doB: { type: Number },
    role: { type: String, default: "user" },
    password: { type: String, minLength: 6, maxLength: 1000 },
    typeLogin: {
      type: String,
      required: true,
      enum: ["imessage", "google", "facebook"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    friends: { type: Array, default: [] },
    friendsRequest: { type: Array, default: [] },
    friendsRequestWaitAccept: { type: Array, default: [] },
    isOnline: { type: Boolean, default: true },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

module.exports = mongoose.model(DOCUMENT_NAME, UserSchema);
