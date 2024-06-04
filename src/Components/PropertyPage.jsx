import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import PropertyCard from "./PropertyCard";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/properties")
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;
