const jwt = require("jsonwebtoken");
const { error403, error401 } = require("../util/res");
const User = require("../models/User");
const e = require("express");
const moment = require("moment");
const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return error401(res);

  try {
    const decode = jwt.verify(token, 'secret');

    req.userId = decode.userId;
    const user = await User.findOne({ _id: decode.userId });
    const currentTime = moment(new Date());
    if (!moment(decode.expired).isAfter(currentTime))
      return res.status(401).json({ success: false, message: "Token has expired" });
    if (user) {
      next();
    } else {
      return error403(res);
    }
  } catch {
    return error403(res);
  }
};

module.exports = verifyToken;
