const { error500, error400 } = require("../util/res");
const { ObjectId } = require("mongodb");
const User = require("../models/User");
const FriendRequest = async (req, res) => {
  try {
    const io = req.io;
    const { userId, type } = req.body;
    let user = await User.findById(userId);
    if (type == 1) {
      const findUser = user.friendsRequest.find(
        (e) => e.user.toString() == req.userId
      );
      if (!findUser)
        user.friendsRequest.push({
          user: ObjectId(req.userId),
          createAt: Date.now(),
        });
    } else
      user.friendsRequest = user.friendsRequest.filter(
        (e) => e.user.toString() != req.userId
      );
    await user.save();
    console.log("alo");
    io.sockets
      .to(`user_${userId}`)
      .emit("friendRequest", "you have new notification");
    return res.json({ success: true, message: "save success" });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};
const UnFriend = async (req, res) => {
  try {
    console.log("UnFriend");
    const { userId } = req.body;
    let user = await User.findById(userId);
    user.friends = user.friends.filter((e) => e.user != req.userId);
    await user.save();
    return res.json({ success: true, message: "save success" });
  } catch (err) {
    return error500(res);
  }
};
const FriendRequestRespone = async (req, res) => {
  try {
    const { userId, type } = req.body;
    let user = await User.findById(req.userId);
    let user2 = await User.findById(userId);
    if (type == 1) {
      const findUser = user.friends.find((e) => e.user.toString() == userId);
      if (!findUser)
        user.friends.push({ user: ObjectId(userId), createAt: Date.now() });
      const findUser2 = user2.friends.find(
        (e) => e.user.toString() == req.userId
      );
      if (!findUser2)
        user2.friends.push({
          user: ObjectId(req.userId),
          createAt: Date.now(),
        });
    }
    user.friendsRequest = user.friendsRequest.filter(
      (e) => e.user.toString() != userId
    );
    await user.save();
    await user2.save();
    return res.json({ success: true, message: "save success", data: user });
  } catch (error) {
    return error500(res);
  }
};
const GetFriendsRequest = async (req, res) => {
  try {
    const friends = await User.findById(req.userId)
      .select("friendsRequest")
      .populate({ path: "friendsRequest.user", select: "fullName avatar" })
      .lean();
    return res.json({ success: true, data: friends.friendsRequest });
  } catch (error) {
    return error500(res);
  }
};

module.exports = {
  FriendRequest,
  FriendRequestRespone,
  GetFriendsRequest,
  UnFriend,
};
