"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";
const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: { type: Boolean, default: true },
    permisstions: {
      type: [String],
      require: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);
