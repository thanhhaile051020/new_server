const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListPost = new Schema({
  user: {
    type:String,
    default:''
  },
  type: {
    type: Number,
    default: 0, //New Post //Old Post
  },
  listPost: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
      isShow: {
        type: Boolean,
        default: true, //Show // Hide Post
      },
      notification:{
        type:Boolean,
        default:true
      }
    },
  ],
});


module.exports = mongoose.model("ListPost", ListPost);
