const express = require("express");
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(4001, {
  cors: {
    origin: "*",
  }, 
});
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const usersRouter = require("./routes/users");
const usersNotificationRouter = require("./routes/userNotification");
const uploadRouter = require("./routes/upload");
const groupRouter = require("./routes/group");
const helmet = require("helmet");
const path = require("path");
const { cloudinary } = require("./util/cloudinary");
const cors = require("cors");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:12345@cluster0.mkhxv.mongodb.net/SocialNetWork?retryWrites=true&w=majority`,
      (err) => {
        if (err) throw err;
        console.log("connected to MongoDB");
      }
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

const userNotification = io.of("/notification");
userNotification.on("connection", (socket) => {
  // console.log("1", socket.id);
});
// userNotification.use((socket, next) => {
//   if (socket.handshake.auth.token) {
//     socket.username;
//     next();
//   } else {
//     next(new Error("Error token"));
//   }
// });
io.on("connection", (socket) => {
  // console.log("1", socket.id);
  // socket.on('test',(rq)=>{
  //   console.log('sss',rq)
  //  io.emit('receive-message','server rs')
  // })
  // socket.to(room).emit("receive-noti",'noti')
  socket.on("join-room", (room) => {
    var rooms = io.sockets.adapter.sids[socket.id];
    for (var room in rooms) {
      socket.leave(room);
    }
    console.log("join", room);
    socket.join(room);
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/users", usersRouter);
app.use("/api/group", groupRouter);
app.use("/api/notification", usersNotificationRouter);
app.use("/api/upload", uploadRouter.routes);
app.use("/filemanager", express.static(path.join(__dirname, "uploads")));

instrument(io, { auth: false });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
