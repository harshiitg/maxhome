// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  imageURL: [String],
  isFavourite: Boolean,
  propertySize: Number,
});

module.exports = mongoose.model("Property", propertySchema);
