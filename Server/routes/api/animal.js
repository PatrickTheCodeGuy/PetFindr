require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
var jwt = require("jsonwebtoken");

// Animal Model
const Animal = require("../../models/Animal");

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

// @route GET api/animal
// @desc Get all Animals (DEV)
// @access DEVELOPER

router.get("/", isAuthenticated, (req, res) => {
  Animal.find()
    .sort({ shelterName: 1 })
    .then(shelters => res.status(200).json(shelters));
});

// @route GET api/animal/:id
// @desc Get a specific animal by ID
// @access private

router.get("/:id", isAuthenticated, (req, res) => {
  const { _id } = req.body;
  Animal.find({ _id: _id }).then(animal => res.status(200).json(animal));
});

// @route POST api/animal
// @desc Creates a new user
// @access Public

router.post("/", (req, res) => {
  const {
    shelter_id,
    typeOfAnimal,
    breed,
    name,
    size,
    age,
    description
  } = req.body;
  const newAnimal = new Animal({
    shelter_id: shelter_id,
    typeOfAnimal: typeOfAnimal,
    breed: breed,
    name: name,
    size: size,
    age: age,
    description: description
  });

  newAnimal.save().then(animal => {
    res.status(201).send({ animal: animal });
  });
});

// @route DELETE api/animal/delete/:id
// @desc deletes a animal
// @access Private

router.delete("/delete/:id", isAuthenticated, (req, res) => {
  const { _id } = req.body;
  Animal.findByIdAndDelete({ _id: _id })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
});

// @route UPDATE api/animal/update/:id
// @desc Updates a animal
// @access Private

router.put("/update/email/:id", isAuthenticated, (req, res) => {
  const { _id } = req.body;
  const {
    shelter_id,
    typeOfAnimal,
    breed,
    name,
    size,
    age,
    description
  } = req.body;
  Shelter.findById(_id)
    .update({ shelter_id, typeOfAnimal, breed, name, size, age, description })
    .then(animal => {
      res.status(200).json({
        msg: `animal updated. shelter id: ${shelter_id}, type: ${typeOfAnimal}, breed: ${breed}, name: ${name}, size: ${size}, age: ${age}, descript: ${description}`
      });
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
