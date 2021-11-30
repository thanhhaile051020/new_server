const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserFriend = new Schema({
  sourceId: {
    type: String,
    required: true,
  },
  targetId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserFriend", PostSchema);
