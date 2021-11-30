const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserNotification = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: Number,
    default: 0,//1:Like 2:Comment 3:Tags 4: Talking about you
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId:{
    type:String,
    default:0
  },
  status:{
    type: Number,
    default: 0,//0:Not Seen 1:Seen
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("UserNotification", UserNotification);
