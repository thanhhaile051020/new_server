const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserNotification = require("../models/UserNotification");
const Group = require("../models/Group"); 
const { error500, error400 } = require("../util/res");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try{
    const { index = 0, pageSize = 10 } = req.query;
    const groups= await Group.find().skip(index*pageSize).limit(pageSize).populate("member").lean()
    return res.json({
      success: true,
      data:groups
    });
  }
  catch(err){

  }
});

router.post("/", verifyToken, async (req, res) => {
  try{
    let data = req.body;
    const group = await new Group(data)
    return res.json({
      success: true,
      data:group
    });
  }
  catch(err){
    
    error500(res)
  }
});

router.put("/", verifyToken, async (req, res) => {
  try{
    const data = req.body;
    let groupUpdate = {...data}
    delete groupUpdate._id
    const group = Group.findByIdAndUpdate(data._id,groupUpdate,{
      new:true
    })
    return res.json({
      success: true,
      data:group
    });
  }
  catch(err){
    error500(res)
  }
});

module.exports = router;
