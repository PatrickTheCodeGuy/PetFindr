const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  shelter_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  typeOfAnimal: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = Animal = mongoose.model("animal", AnimalSchema);
