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
  latitude: Number,
  longitude: Number,
  matchScore: Number,
  furnishing: String,
  leaseType: String
});

module.exports = mongoose.model("Property", propertySchema);
