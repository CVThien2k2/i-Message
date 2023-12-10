const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 20 },
    gender: { type: String, default: "male" },
    numberPhone: { type: Number, default: null, unique: true },
    address: { type: String, default: null },
    avatar: {
      type: String,
      default:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256",
    },
    role: { type: String, default: "user" },
    password: { type: String, required: true, minLength: 6, maxLength: 1000 },
    typeLogin: {
      type: String,
    },
    email: { type: String, trim: true, required: true, unique: true },

    // local: {
    //     email: { type: String, trim: true },
    //     password: String,
    //     isActive: { type: Boolean, default: false },
    //     veryfyToken: String,
    // },
    // facebook: {
    //     uid: String,
    //     token: String,
    //     email: { type: String, trim: true }
    // },
    // google: {
    //     uid: String,
    //     token: String,
    //     email: { type: String, trim: true }
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);