const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Property = require('./backend/models/Property');

const app = express();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

const mongoURI = 'mongodb+srv://Cluster26341:YERVXnpoVWhm@cluster26341.w93afml.mongodb.net/realEstate?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/properties', (req, res) => {
  Property.find().then(properties => res.json(properties));
});

app.post("/api/toggleFavourite", async (req, res) => {
  try {
    const propertyId = req.body.propertyId; 
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.isFavourite = !property.isFavourite;
    await property.save();

    res.json({ message: "Property updated", property });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Filtering properties
app.get('/api/filterProperties', async (req, res) => {
  try {
    const filters = req.query;
    const filterCriteria = {};
    console.log(filters)

    if (filters.priceMin) filterCriteria.price = { ...filterCriteria.price, $gte: filters.priceMin };
    if (filters.priceMax) filterCriteria.price = { ...filterCriteria.price, $lte: filters.priceMax };
    if (filters.location) filterCriteria.location = filters.location;
    if (filters.propertySizeMin) filterCriteria.propertySize = { ...filterCriteria.propertySize, $gte: filters.propertySizeMin };
    if (filters.propertySizeMax) filterCriteria.propertySize = { ...filterCriteria.propertySize, $lte: filters.propertySizeMax };
    if (filters.furnishing) filterCriteria.furnishing = filters.furnishing;
    if (filters.leaseType) filterCriteria.leaseType = filters.leaseType;

    const properties = await Property.find(filterCriteria);
    res.json(properties);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Searching properties
app.get('/api/searchProperties', async (req, res) => {
  try {
    const { query } = req.query;
    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    };

    const properties = await Property.find(searchCriteria);
    res.json(properties);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
