import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import PropertyCard from "./PropertyCard";
import Filters from "./Filters";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/properties`
        );
        setProperties(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/searchProperties?query=${searchQuery}`
      );
      setProperties(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Header />
      {/* <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search properties..."
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}
      <Filters setProperties={setProperties} />
      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyPage;
