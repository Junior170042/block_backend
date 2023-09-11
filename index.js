require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const path = require("path");
const multer = require('multer');
const cookieParser = require("cookie-parser");
const optionsCors = require("./config/CorsOptions");
const Connect = require("./config/Connection");

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(optionsCors));

//handling file upload
const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);


Connect()

app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/cat", categoryRoute);

app.listen(process.env.PORT || 10000, () => {
  console.log("listening on port " + process.env.PORT || 10000);
});
