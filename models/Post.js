const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    default:""
  },
  text: {
    type: String,
    default: "",
  },
  audience: {
    type: String,
    default:"public"
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status:{
    type:Number,
    default:0
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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
 
  share: { type: Number, default: 0 },
  attachments: {
    type: Array,
    default: [],
  },
  postParent: { type: String, default: "" },
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
PostSchema.pre("remove", function () {});
PostSchema.pre("updateOne", function () {
  this.set({ updateAt: new Date() });
});
module.exports = mongoose.model("post", PostSchema);
