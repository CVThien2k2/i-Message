const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DOCUMENT_NAME = "Otp";
const COLLECTION_NAME = "Otps";
const otpSchema = new Schema(
  {
    user_name: { type: String, required: true },
    otp: { type: String },
    time: { type: Date, default: Date.now, index: { expires: 60 } },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, otpSchema);
