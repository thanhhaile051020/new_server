const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const uploadRouter = require("./routes/upload");
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

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/upload", uploadRouter.routes);
app.use("/filemanager", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
