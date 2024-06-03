const mongoose = require('mongoose');
const Property = require('./models/Property');

const mongoURI = 'mongodb+srv://Cluster26341:YERVXnpoVWhm@cluster26341.w93afml.mongodb.net/realEstate?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const properties = [
  {
    title: 'Enchanted Castle',
    description: 'A beautiful castle with magical surroundings.',
    price: 1000000,
    location: 'Mystic Lands',
    imageURL: 'https://example.com/castle.jpg'
  },
  {
    title: 'Cozy Cottage',
    description: 'A small, cozy cottage in the woods.',
    price: 200000,
    location: 'Whispering Woods',
    imageURL: 'https://example.com/cottage.jpg'
  },
  {
    title: 'Modern Apartment',
    description: 'A sleek apartment in the city.',
    price: 500000,
    location: 'Downtown',
    imageURL: 'https://example.com/apartment.jpg'
  }
];

mongoose.connection.once('open', () => {
  Property.insertMany(properties)
    .then(() => {
      console.log('Mock data inserted');
      mongoose.connection.close();
    })
    .catch(err => console.log(err));
});
