const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
//REGISTER
router.post("/register", async (request, response) => {
  try {
    //gen hashed password

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    //include new password

    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
});

//LOGIN

router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    const validPassword = user
      ? await bcrypt.compare(request.body.password, user.password)
      : false;

    if (!validPassword) {
      response.status(401).json("User not found, wrong email or password");
    } else {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
      const { password, ...info } = user._doc;
      response.status(200).json({ ...info, accessToken });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
