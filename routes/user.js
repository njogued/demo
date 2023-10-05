const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User page");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.route(":/userName").get((req, res) => {
  res.send(`User with userName: ${req.params.userName}`);
});

module.exports = router;
