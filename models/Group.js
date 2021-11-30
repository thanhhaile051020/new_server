const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Group = new Schema({
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  updateBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  groupName:{
    type: String,
    required: true,
    default:''
  },
  groupDescription:{
    type: String,
    default:''
  },
  adminGroup:[{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  member:[{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
//   members:{
//       type:Array<>,
//       default:[]
//   }
});

module.exports = mongoose.model("group", Group);
