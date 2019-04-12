require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
var jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/Users");

function isAuthenticated(req, res, next) {
  // do any checks you want to in here
  const token = req.headers["x-access-token"];
  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  if (!token) return res.redirect("/api/user/redirect");
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  jwt.verify(token, process.env.JWTSecret, function(err, decoded) {
    if (err) {
      res.redirect("/api/user/redirect");
    }
    next();
  });
}

router.get("/redirect", (req, res) => {
  res.send("Not Auth");
});
// @route GET api/user
// @desc Get all users (DEV)
// @access DEVELOPER

router.get("/", isAuthenticated, (req, res) => {
  User.find()
    .sort({ email: 1 })
    .then(users => res.status(200).json(users));
});

// @route POST api/user/newuser
// @desc Creates a new user
// @access Public

router.post("/newuser", (req, res) => {
  const { email, fullName, password, location } = req.body;
  // Bcrypt hash password
  let hash = bcrypt.hashSync(password, 14);
  // set stored pass to the hash
  let newPassword = hash;
  const newUser = new User({
    email: email,
    fullName: fullName,
    password: newPassword,
    location: location
  });

  newUser.save().then(user => {
    var token = jwt.sign({ id: user._id }, process.env.JWTSecret, {
      expiresIn: 86400
    });
    res.status(201).send({ token: token, user: user });
  });
});

// @route DELETE api/user/${_id}
// @desc deletes a user
// @access Private

router.delete("/delete", isAuthenticated, (req, res) => {
  const id = req.body._id;
  User.findByIdAndDelete({ _id: id })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
