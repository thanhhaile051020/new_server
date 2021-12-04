const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const MultipleFile = require("../models/MultipleFile");
const jwt = require("jsonwebtoken");
// require("dotenv").config();
router.get("/", (req, res) => res.send("USER ROUTE"));
const { error500, error400 } = require("../util/res");
//@route POST api/auth/register

//REGISTER
router.post("/register", async (req, res) => {
  const { username, password, email, fullName } = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  try {
    //check exits user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    const emailuser = await User.findOne({ email });
    if (emailuser)
      return res
        .status(400)
        .json({ success: false, message: "Email đã tồn tại" });
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
    });
    await newUser.save();
    const date = new Date();
    date.setDate(date.getDate() + 3);
    //Return token
    const accessToken = jwt.sign(
      { userId: newUser._id, expired: date },
      "secret"
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
});
//@route POST api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) return error400(res, "Tài khoản hoặc mật khẩu không đúng");
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return error400(res, "Tài khoản hoặc mật khẩu không đúng");

    const date = new Date();
    date.setDate(date.getDate() + 300000);
    const accessToken = jwt.sign({ userId: user._id, expired: date }, "secret");

    res.json({
      success: true,
      message: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
});

module.exports = router;
