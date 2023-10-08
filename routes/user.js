const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Middleware to parse form data sent from fe
router.use(express.urlencoded({ extended: true }));

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
  const county = req.body.county;
  const constituency = req.body.constituency;
  const ward = req.body.ward;
  // User.create({
  //   email: email,
  //   firstName: firstName,
  //   lastName: lastName,
  //   password: password,
  //   phone_number: phone_number,
  //   level: 1,
  //   county: county,
  //   constituency: constituency,
  //   ward: ward,
  // });
  console.log(email);
});

router.route(":/userName").get((req, res) => {
  res.send(`User with userName: ${req.params.userName}`);
});

module.exports = router;
