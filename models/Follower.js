const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Follower = new Schema({
  sourceId: {
    type: String,
    required: true,
  },
  targetId: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["Like", "Dislike", "Follow"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }
});

module.exports = mongoose.model("post", PostSchema);
