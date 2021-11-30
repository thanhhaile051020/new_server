const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("../models/Post");
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default:null
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    default: "",
  },
  file:{
    type: Schema.Types.ObjectId,
    ref: "SingleFile",
    default:null
  },
  like: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      createAt: {
        type: Date,
        default: Date.now, 
      },
    },
  ],
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
CommentSchema.pre("updateOne", function () {
  this.set({ updateAt: new Date() });
});
module.exports = mongoose.model("Comment", CommentSchema);
