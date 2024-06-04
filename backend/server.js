const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Property = require('./models/Property');

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
