const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Middleware to parse form data sent from fe
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(200).json({ message: "Log in to access this page" });
  }
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
    const emailExists = await User.findOne({ where: { email: email } });
    const userNameExists = await User.findOne({
      where: { userName: userName },
    });
    if (emailExists || userNameExists) {
      res.status(401).json({ message: "Email or username is already in use" });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newUser = await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: hashedPassword,
        phone_number: phone_number,
        level: 1,
        county: county,
        constituency: constituency,
        ward: ward,
      });
      res.status(201).json({ user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", checkLoginType, (req, res) => {
  // const { nameOrEmail, password } = req.body;
  if (req.validUser === true) {
    res.send("Logged in");
  } else {
    res.send("Invalid user");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
});

router.get("/protected", checkIfAllowed, (req, res) => {
  if (req.allowedAccess == true) {
    res.send("You can proceed to this page");
  } else {
    res.send("please login first");
  }
});

router.route("/:userName").get((req, res) => {
  if (req.session.user) {
    if (req.session.user.userName == req.params["userName"]) {
      res.send("This is your space. Feel free");
      return;
    }
  }
  res.send(`User with userName: ${req.params.userName}`);
});

async function checkLoginType(req, res, next) {
  const { nameOrEmail, password } = req.body;
  let user;
  if (nameOrEmail.includes("@")) {
    user = await User.findOne({ where: { email: nameOrEmail } });
  } else {
    user = await User.findOne({ where: { userName: nameOrEmail } });
  }
  if (user == null) {
    return res.status(400).send("Cannot find user");
  } else {
    try {
      if (await bcrypt.compare(password, user.password)) {
        req.validUser = true;
        req.session.user = user;
      } else {
        req.validUser = false;
      }
      next();
    } catch (error) {
      res.status(500).send("Internal error");
    }
  }
}

function checkIfAllowed(req, res, next) {
  if (req.session.user) {
    req.allowedAccess = true;
  } else {
    req.allowedAccess = false;
  }
  next();
}

module.exports = router;
