const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User page");
});

router.get("/new", (req, res) => {
  res.send("Create a new user");
});

router.route(":/userName").get((req, res) => {
  res.send(`User with userName: ${req.params.userName}`);
});

module.exports = router;
