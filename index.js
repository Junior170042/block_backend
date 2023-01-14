require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const path = require("path");
const mongoose = require("mongoose");
const multer = require('multer');
const cookieParser = require("cookie-parser");

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(morgan('dev'));
mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connection succed"))
  .catch((err) => console.log(err));


//Upload file fron users
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const uploadFile = multer({ storage: storage });
app.post('/api/upload', uploadFile.single("file"), (req, res) => {
  res.status(200).json("File is upload successfully")
})

app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/cat", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT || 5000);
});
