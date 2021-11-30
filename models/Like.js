const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("../models/Post");
const Like = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
Like.pre("remove", function () {
  console.log("removingggggg");
});
Like.pre(
  "findOneAndDelete",
  { query: true, document: false },
  async function () {
    // const docToUpdate = await this.model.findOne(this.getQuery());
    Post.updateMany(
      {},
      { $pull:{ like:{$in:[this.getQuery()]}} },
    ).then((a)=>console.log(a)).catch((a)=>console.log(a));
    console.log("deleteingggg");
  }
);
Like.pre("save", function () {
  console.log("savinggggggggg");
});
Like.pre("updateOne", function () {
  console.log("updateOneingggggggggg");
});

module.exports = mongoose.model("Like", Like);
