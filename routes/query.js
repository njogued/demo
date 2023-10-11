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
      if (req.session.user.id == query.userId) {
        res.status(201).json({ query: query, message: "You can also edit it" });
        return;
      }
      res.status(201).json({ query: query });
    } else {
      res.status(201).json({ query: query });
    }
  } else {
    res.send("Query does not exist");
  }
});

module.exports = router;
