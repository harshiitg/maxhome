import React, { useState } from "react";
import "./Filters.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function Filters({ setProperties }) {
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    location: null,
    propertySizeMin: null,
    propertySizeMax: null,
    furnishing: null,
    leaseType: null,
  });

  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = async (clearFilter = false) => {
    const filterCriteria = new URLSearchParams();
    if (!clearFilter) {
      if (filters.priceMin) filterCriteria.append("priceMin", filters.priceMin);
      if (filters.priceMax) filterCriteria.append("priceMax", filters.priceMax);
      if (filters.location) filterCriteria.append("location", filters.location);
      if (filters.propertySizeMin)
        filterCriteria.append("propertySizeMin", filters.propertySizeMin);
      if (filters.propertySizeMax)
        filterCriteria.append("propertySizeMax", filters.propertySizeMax);
      if (filters.furnishing)
        filterCriteria.append("furnishing", filters.furnishing);
      if (filters.leaseType)
        filterCriteria.append("leaseType", filters.leaseType);
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/filterProperties?${filterCriteria}`
      );
      const data = await response.json();
      // Handle the filtered properties data
      setProperties(data);
      if (!clearFilter) {
        handleFilterButtonCLick();
      }
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
  };

  const handleFilterButtonCLick = () => {
    setShowFilterModal(!showFilterModal);
  };

  return (
    <>
      <>
        <button
          className="filter-button"
          onClick={handleFilterButtonCLick}
          style={{
            border: showFilterModal
              ? "1px solid rgb(0, 106, 255)"
              : "1 px solid black",
          }}
        >
          <span style={{ marginRight: "8px" }}>Filters</span>
          {showFilterModal ? <FaArrowUp /> : <FaArrowDown />}
        </button>
        <ImCross onClick={() => applyFilters(true)} />
      </>
      {showFilterModal ? (
        <div className="container">
          {showFilterModal && (
            <div className="filter-model">
              <div className="filter-header">
                <span className="filter-title">Filter By</span>
              </div>
              <div className="filter-content">
                <div className="filter-section">
                  <div className="filter-title">Price</div>
                  <div className="filter-input-group">
                    <input
                      type="number"
                      name="priceMin"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                    />
                    <input
                      type="number"
                      name="priceMax"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="filter-section">
                  <div className="filter-title">Location</div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="filter-section">
                  <div className="filter-title">Property Size</div>
                  <div className="filter-input-group">
                    <input
                      type="number"
                      name="propertySizeMin"
                      placeholder="Min"
                      value={filters.propertySizeMin}
                      onChange={handleFilterChange}
                    />
                    <input
                      type="number"
                      name="propertySizeMax"
                      placeholder="Max"
                      value={filters.propertySizeMax}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="filter-section">
                  <div className="filter-title">Furnishing</div>
                  <select
                    name="furnishing"
                    value={filters.furnishing}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div className="filter-section">
                  <div className="filter-title">Lease Type</div>
                  <select
                    name="leaseType"
                    value={filters.leaseType}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any</option>
                    <option value="Only Families">Only Families</option>
                    <option value="Open to all">Open to all</option>
                  </select>
                </div>
              </div>
              <div className="filter-footer">
                <button
                  className="apply-button"
                  onClick={() => applyFilters(false)}
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Filters;
