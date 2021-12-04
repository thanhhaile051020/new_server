const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { error500, error400 } = require("../util/res");
const verifyToken = require("../middleware/auth");
const ReportPost = require("../models/ReportPost");
router.get("/getUsers", verifyToken, async (req, res) => {
  try {
    User.find()
      .select(["-password", "-createAt"])
      .lean()
      .then((rs) => {
        try {
          return res.json({ success: true, data: rs });
        } catch (error) {
          return error500(res);
        }
      });
  } catch (err) {
    return error500(res);
  }
});

router.post("/createReportPost", verifyToken, async (req, res) => {
  try {
    const { type, content, postId, status } = req.body;
    let rp = new ReportPost({ type, content, postId, status });
    await rp.save();
    return res.json({success:true,data:rp})
  } catch (err) { 
    return error500(res);
  }
});
module.exports = router;
