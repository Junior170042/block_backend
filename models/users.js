const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/djfasnazecypd4y/image/upload/v1694465905/user-images/inoyriqj7rlknzfwunyo.avif",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
