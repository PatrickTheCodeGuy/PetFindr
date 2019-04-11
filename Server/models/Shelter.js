const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  shelterName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  aboutUs: {
    type: String,
    required: true
  },
  adoptionReq: {
    type: String,
    required: true
  }
});

module.exports = Shelter = mongoose.model("shelter", ShelterSchema);
