const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 8,
      max: 20,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    imageList: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    friends: [
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
    friendsRequest: [
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    status:{
      type:Number,
      default:1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
