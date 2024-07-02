"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";
const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: { type: String, require: true },
    privateKey: { type: String, require: true },
    refreshToken: { type: String, require: true },
    refreshTokenUsed: { type: Array, default: [] },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
