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

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
