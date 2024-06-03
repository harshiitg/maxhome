import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/properties')
      .then(response => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Property Listings</h1>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            <img src={property.imageURL} alt={property.title} style={{ width: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
