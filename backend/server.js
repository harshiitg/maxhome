const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Property = require('./models/Property');

const app = express();

app.use(cors());

const mongoURI = 'mongodb+srv://Cluster26341:YERVXnpoVWhm@cluster26341.w93afml.mongodb.net/realEstate?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/properties', (req, res) => {
  Property.find().then(properties => res.json(properties));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
