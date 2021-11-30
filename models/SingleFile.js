const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singleFileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true,
      default:"main"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("SingleFile", singleFileSchema);
