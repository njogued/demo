const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.use(express.urlencoded({ extended: true }));

router.route("/:id").get(async (req, res) => {
  const review = await Review.findOne({ where: { id: req.params.id } });
  if (review) {
    if (req.session.user && review.id == req.session.id) {
      res
        .status(200)
        .json({
          review: review,
          message: "You can update & delete this review",
        });
      return;
    }
    res.status(200).json({ review: review });
  } else {
    res.status(404).json({ message: "Review could not be found" });
  }
});

module.exports = router;
