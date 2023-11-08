const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatGroupSchema = new Schema({
  name: String,
  avatar: String,
  userCount: {type: Number, max: 50},
  messCount:{type: Number},
  userID: Schema.Types.ObjectId,
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);

module.exports = ChatGroup;
