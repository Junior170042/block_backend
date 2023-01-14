const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//one day validation access
const validateTime = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: validateTime,
  })
}
//Register new user
router.post("/register", async (req, res) => {

  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    return res.status(300).json();

  }
  const mailExist = await User.findOne({ email: req.body.email });
  if (mailExist) {
    return res.status(600).json();

  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPas = await bcrypt.hash(req.body.password, salt);
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPas,
      picture: req.body.picture,
    });
    const user = await newUser.save();
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Logins(find a user)

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ status: false, message: "User is not registered" });

    //comparing the password
    const validatePas = await bcrypt.compare(req.body.password, user.password);
    if (!validatePas) return res.json({ status: false, message: "User or password incorrect." });
    //not sending the password
    const { password, ...others } = user._doc;
    //token config
    const token = createToken(others._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: validateTime * 1000
    })

    res.json({ status: true, user: others });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/userExist", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json("");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/emailExist", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json("");
    };
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
