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
// Redirect
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

// @route POST api/user/login
// @desc Logs in a user
// @access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Bcrypt hash password
  User.findOne({ email: email })

    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        var token = jwt.sign({ id: user._id }, process.env.JWTSecret, {
          expiresIn: 86400
        });
        res.status(201).json({ token: token, user: user });
      } else {
        res
          .status(401)
          .json({ msg: "Incorrect email/password, please try again" });
      }
    })
    .catch(err => {
      res.json({ err });
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

// @route UPDATE api/user/update/email/:id
// @desc Updates a users email
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  User.findById(id)
    .updateOne({ email })
    .then(user => {
      res.status(200).json({ msg: `user email updated too ${email}` });
    });
});

// @route UPDATE api/user/update/name/:id
// @desc Updates a users name
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { fullName } = req.body;
  User.findById({ _id: id }).update({ fullName });
});

// @route UPDATE api/user/update/email/:id
// @desc Updates a users password
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  let hash = bcrypt.hashSync(password, 14);
  // set stored pass to the hash
  let newPassword = hash;
  User.findById({ _id: id }).update({ password: newPassword });
});

// @route UPDATE api/user/update/email/:id
// @desc Updates a users location
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { location } = req.body;
  User.findById({ _id: id }).update({ location });
});

module.exports = router;
