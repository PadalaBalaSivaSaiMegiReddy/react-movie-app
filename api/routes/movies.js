const router = require("express").Router();
const Movie = require("../models/Movie");


const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else{
    res.status(403).json("You are not allowed to add a movie");
  }
});


//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedMovie);
        } catch (error) {
        res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to update a movie");
    }

}
);

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie has been deleted");
        } catch (error) {
        res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to delete a movie");
    }
}
);


//GET

router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET ALL

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
        const movies = query
            ? await Movie.find().sort({ _id: -1 }).limit(5)
            : await Movie.find();
        res.status(200).json(movies);
        } catch (error) {
        res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed to see all movies");
    }
}
);

//GET RANDOM

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
        movie = await Movie.aggregate([
            { $match: { isSeries: true } },
            { $sample: { size: 1 } },
        ]);
        } else {
        movie = await Movie.aggregate([
            { $match: { isSeries: false } },
            { $sample: { size: 1 } },
        ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


    

module.exports = router;
