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

router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      phone_number,
      firstName,
      lastName,
      userName,
      county,
      constituency,
      ward,
    } = req.body;
    const newUser = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      phone_number: phone_number,
      level: 1,
      county: county,
      constituency: constituency,
      ward: ward,
    });
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.route(":/userName").get((req, res) => {
  res.send(`User with userName: ${req.params.userName}`);
});

module.exports = router;
