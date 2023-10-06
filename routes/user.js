const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User page");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const level = req.body.level;
  const county = req.body.county;
  const constituency = req.body.constituency;
  const ward = req.body.ward;
});

router.route(":/userName").get((req, res) => {
  res.send(`User with userName: ${req.params.userName}`);
});

module.exports = router;
