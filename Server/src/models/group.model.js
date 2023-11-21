const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatGroupSchema = new Schema({
  name: {type: String, default: null},
  avatar: {type: String, default: null},
  userCount: {type: Number, max: 50,default: 2},
  messCount:{type: Number, default: 0},
  // userID: Schema.Types.ObjectId,
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
},
{
    timestamps: true,
});

const ChatGroup = mongoose.model('group', chatGroupSchema);

module.exports = ChatGroup;
