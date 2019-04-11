const express = require("express");
const router = express.Router();

// User Model
const User = require("../../models/Users");

// @route GET api/user
// @desc Get all users (DEV)
// @access DEVELOPER

router.get("/", (req, res) => {
  User.find()
    .sort({ email: 1 })
    .then(users => res.status(200).json(users));
});

// @route POST api/user/newuser
// @desc Creates a new user
// @access Public

router.post("/newuser", (req, res) => {
  const { email, fullName, password, location } = req.body;
  const newUser = new User({
    email: email,
    fullName: fullName,
    password: password,
    location: location
  });

  newUser.save().then(user => res.status(201).json(user));
});

module.exports = router;
