const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportPost = new Schema({
  type: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default:"public"
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  status:{
    type:Number,
    default:0 // 0:pending  1:unconfirm 2:confirm
  },
  createAt: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("ReportPost", ReportPost);
