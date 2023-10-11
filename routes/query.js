const express = require("express");
const router = express.Router();
const Query = require("../models/query");

router.use(express.urlencoded({ extended: true }));

router
  .get("/create", (req, res) => {
    if (req.session.user) {
      res.render("createquery");
    } else {
      res.send("Please login first");
    }
  })
  .post("/create", async (req, res) => {
    const { title, queryBody } = req.body;
    newQuery = await Query.create({
      title: title,
      queryBody: queryBody,
      userId: req.session.user.id,
    });
    res.status(201).json({ query: newQuery });
  });

router.route("/:id").get(async (req, res) => {
  query = await Query.findOne({ where: { id: req.params["id"] } });
  if (query) {
    if (req.session.user) {
      res.send("You are logged in and can view all details on the query");
    } else {
      res.send("You can only view the query details but not votes");
    }
  } else {
    res.send("Query does not exist");
  }
});

module.exports = router;
