const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

const saltRounds = 10;
//REGISTER
router.post("/register", async (request, response) => {
    try {

        //gen hashed password

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(request.body.password,salt);

        //include new hased password

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

module.exports = router;
