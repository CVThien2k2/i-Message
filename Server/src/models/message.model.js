const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: String,
  file:{ data: Buffer,contentType: String, fileName: String},
  timestamp: Date,createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null},
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  group_id: { type: Schema.Types.ObjectId, ref: 'chatgroup' },
});

module.exports = mongoose.model('Message', messageSchema);


