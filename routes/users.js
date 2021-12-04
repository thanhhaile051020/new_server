const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  FriendRequest,
  FriendRequestRespone,
  GetFriendsRequest,
  UnFriend,
} = require("../controllers/friend");
const { error500, error400 } = require("../util/res");
const verifyToken = require("../middleware/auth");
const argon2 = require("argon2");
router.get("/getFriendRequest", verifyToken, GetFriendsRequest);
router.post("/unfriend", verifyToken, UnFriend);
router.post("/friendRequest", verifyToken, FriendRequest);
router.post("/friendRespone", verifyToken, FriendRequestRespone);
// GET ALL USER
// router.get("/user/", verifyToken, (req, res) => {
//   User.find().then((users) => {
//     try {
//       res.json(users);
//     } catch (error) {
//       return error500(res);
//     }
//   });
// });
// GET USER PER PAGE
router.get("/", verifyToken, (req, res) => {
  const page = Number.parseInt(req.query.page);
  const pageSize = Number.parseInt(req.query.pageSize);
  User.find()
    .skip(page)
    .limit(pageSize)
    .exec((err, users) => {
      User.count().exec((err, count) => {
        res.json({
          data: {
            items: users,
            pagination: {
              page,
              pageSize,
              totalElements: count,
              numberOfElements: users.length,
            },
          },
        });
      });
    });
});
//SEARCH USER
router.get("/search", verifyToken, (req, res) => {
  const searchKey = req.query.key;
  const page = Number.parseInt(req.query.page);
  const pageSize = Number.parseInt(req.query.pageSize);

  User.find({ fullName: searchKey })
    .sort({ fullName: "asc" })
    .limit(pageSize)
    .then((result) => {
      User.find({ fullName: searchKey }).then((totalResult) => {
        res.json({
          data: {
            items: result,
            pagination: {
              page,
              pageSize,
              totalElements: totalResult.length,
              numberOfElements: result.length,
            },
          },
        });
      });
    })
    .catch((err) => {
      return error500(err);
    });
});

// UPDATE USER
router.put("/", verifyToken, async (req, res) => {
  const { fullName, newPassword, email, avatar, coverPicture, dateOfBirth } =
    req.body;

  const date = new Date();
  let updateData = {
    fullName,
    email,
    avatar,
    coverPicture,
    dateOfBirth,
    updatedAt: date.getDate(),
  };

  if (newPassword) {
    updateData.password = await argon2.hash(newPassword);
  }

  // console.log("ABC", req.userId);

  await User.findByIdAndUpdate(req.userId, updateData)
    .setOptions({ new: true })
    .then((result) => {
      res.json(result);
      //   console.log(result);
    })
    .catch((err) => {
      return error500(err);
    });
});

// DETELE USER
// router.put
router.get("/profile", verifyToken, (req, res) => {
  console.log("profile");
  User.findById(req.userId)
    .populate({ path: "friends.user", select: "fullName avatar" })
    .populate({ path: "friendsRequest.user", select: "fullName avatar" })
    .lean()
    .then((user) => {
      try {
        res.json({ success: true, data: user });
      } catch (error) {
        return error500(res);
      }
    });
});

router.get("/notification", verifyToken, (req, res) => {
  const userId = req.params.id;
  User.findById(userId).then((user) => {
    try {
      res.json(user);
    } catch (error) {
      return error500(res);
    }
  });
});
//GET USER DETAIL
router.get("/:id", verifyToken, (req, res) => {
  try {
    const userId = req.params.id;
    User.findById(userId)
      .populate({ path: "friends.user", select: "fullName avatar" })
      .populate({ path: "friendsRequest.user", select: "fullName avatar" })
      .lean()
      .then((user) => {
        try {
          res.json(user);
        } catch (error) {
          return error500(res);
        }
      });
  } catch (err) {
    return error500(res);
  }
});

// router.get("/fi", verifyToken, (req, res) => {
//   const userId = req.params.id;
//   User.findById(userId).then((user) => {
//     try {
//       res.json(user);
//     } catch (error) {
//       return error500(res);
//     }
//   });
// });

/////////////////////////////ADMIN/////////////////////////////////////

router.get("/search/:keySearch", verifyToken, (req, res) => {
  try {
    const keySearch = req.params.keySearch;
    const regex = new RegExp(keySearch, "i");
    User.find({ fullName: { $regex: regex } })
      .lean()
      .then((user) => {
        try {
          res.json(user);
        } catch (error) {
          return error500(res);
        }
      });
  } catch (err) {
    return error500(res);
  }
});

module.exports = router;
