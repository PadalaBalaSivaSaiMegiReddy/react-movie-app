const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");

const verify = require("../verifyToken");

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndUpdate(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const user= await User.findById(req.params.id);
    const {password,...info} = user._doc;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL

//GET USER STATS

module.exports = router;
