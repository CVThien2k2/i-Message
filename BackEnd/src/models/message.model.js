const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DOCUMENT_NAME = "Message";
const COLLECTION_NAME = "Messages";

const messageSchema = new Schema(
  {
    text: String,
    file: { data: Buffer, contentType: String, fileName: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    group_id: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
