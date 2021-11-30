const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserNotification = require("../models/UserNotification");
const { error500, error400 } = require("../util/res");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  const { index = 1, pageSize = 10 } = req.query;
  const result = await Promise.all([
    UserNotification.find({ user: req.userId }).populate("fromUser").lean(),
    UserNotification.find({ user: req.userId })
      .skip(index * pageSize)
      .limit(pageSize)
      .populate("fromUser")
      .lean(),
  ]);
  const listNoti = result[0];
  let countNoti = 0;
  listNoti.forEach((noti) => {
    if (noti.status === 1) countNoti++;
  });
  return res.json({
    success: true,
    countNotification: countNoti,
    totalNotification: listNoti.length,
    data: result[1],
  });
});

router.get("/notificationSeen/:id", verifyToken, async (req, res) => {
  try{
    const { id } = req.params;
    await UserNotification.findOneAndUpdate({_id:id},{status:1})
    return res.json({
      success: true,
    });
  }
  catch(err){
    
    error500(res)
  }
});


module.exports = router;
