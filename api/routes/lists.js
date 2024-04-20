const router = require("express").Router();
const List = require("../models/List");

const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to add a list");
  }
});


//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
);

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
);

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
}
);

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let list = [];
  try {
    if (type === "movie") {
      list = await List.aggregate([
        { $match: { type: "movie" } },
        { $sample: { size: 10 } },
      ]);
    } else {
      list = await List.aggregate([
        { $match: { type: "series" } },
        { $sample: { size: 10 } },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
}
);





module.exports = router;
