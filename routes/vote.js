const express = require("express");
const router = express.Router();
const Vote = require("../models/vote");

router.use(express.urlencoded({ extended: true }));

router.route("/:id").get(async (req, res) => {
  const vote = await Vote.findOne({ where: { id: req.params.id } });
  if (vote) {
    if (req.session.user && vote.id == req.session.id) {
      res
        .status(200)
        .json({ vote: vote, message: "You can update & delete this vote" });
      return;
    }
    res.status(200).json({ vote: vote });
  } else {
    res.status(404).json({ message: "Vote could not be found" });
  }
});

module.exports = router;
