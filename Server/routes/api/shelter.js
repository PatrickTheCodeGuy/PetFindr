require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
var jwt = require("jsonwebtoken");

// Shelter Model
const Shelter = require("../../models/Shelter");

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

// @route GET api/shelter
// @desc Get all shelters (DEV)
// @access DEVELOPER

router.get("/", isAuthenticated, (req, res) => {
  Shelter.find()
    .sort({ shelterName: 1 })
    .then(shelters => res.status(200).json(shelters));
});

// @route POST api/user/newshelter
// @desc Creates a new user
// @access Public

router.post("/newshelter", (req, res) => {
  const {
    email,
    shelterName,
    address1,
    address2,
    phoneNumber,
    aboutUs,
    adoptionReq,
    password
  } = req.body;
  // Bcrypt hash password
  let hash = bcrypt.hashSync(password, 14);
  // set stored pass to the hash
  let newPassword = hash;
  const newShelter = new Shelter({
    email: email,
    shelterName: shelterName,
    address1: address1,
    address2: address2,
    phoneNumber: phoneNumber,
    aboutUs: aboutUs,
    adoptionReq: adoptionReq,
    password: newPassword
  });

  newShelter.save().then(shelter => {
    var token = jwt.sign({ id: shelter._id }, process.env.JWTSecret, {
      expiresIn: 86400
    });
    res.status(201).send({ token: token, shelter: shelter });
  });
});

// @route POST api/shelter/login
// @desc Logs in a shelter
// @access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Bcrypt hash password
  Shelter.findOne({ email: email })

    .then(shelter => {
      console.log(shelter);
      if (shelter && bcrypt.compareSync(password, shelter.password)) {
        var token = jwt.sign({ id: shelter._id }, process.env.JWTSecret, {
          expiresIn: 86400
        });
        res.status(201).json({ token: token, shelter: shelter });
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

// @route DELETE api/shelter/${_id}
// @desc deletes a shelter
// @access Private
// NOTE: Need to come back and delete all Animal collections
// that are associated to a shelter upon deletion
router.delete("/delete", isAuthenticated, (req, res) => {
  const id = req.body._id;
  Shelter.findByIdAndDelete({ _id: id })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
});

// @route UPDATE api/shelter/update/email/:id
// @desc Updates a shelters email
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { email } = req.body;
  Shelter.findById(id)
    .updateOne({ email })
    .then(user => {
      res.status(200).json({ msg: `user email updated too ${email}` });
    });
});

// @route UPDATE api/shelter/update/sheltername/:id
// @desc Updates a shelters name
// @access Private

router.put("/update/sheltername/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { shelterName } = req.body;
  Shelter.findById({ _id: id }).update({ shelterName });
});

// @route UPDATE api/shelter/update/address/:id
// @desc Updates a shelter address
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { address1, address2 } = req.body;
  Shelter.findById({ _id: id }).update({ address1, address2 });
});

// @route UPDATE api/shelter/update/phoneNumber/:id
// @desc Updates a shelter phone number
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { phoneNumber } = req.body;
  Shelter.findById({ _id: id }).update({ phoneNumber });
});

// @route UPDATE api/shelter/update/about_us/:id
// @desc Updates a shelter About Us
// @access Private

router.put("/update/about_us/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { aboutUs } = req.body;
  Shelter.findById({ _id: id }).update({ aboutUs });
});

// @route UPDATE api/shelter/update/adoption_req/:id
// @desc Updates a shelter Adoption Req
// @access Private

router.put("/update/adoption_req/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { adoptionReq } = req.body;
  Shelter.findById({ _id: id }).update({ adoptionReq });
});

// @route UPDATE api/shelter/update/password/:id
// @desc Updates a shelters password
// @access Private

router.put("/update/password/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  let hash = bcrypt.hashSync(password, 14);
  // set stored pass to the hash
  let newPassword = hash;
  Shelter.findById({ _id: id }).update({ password: newPassword });
});

module.exports = router;
