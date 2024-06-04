import React from "react";
import "./PropertyCard.css";
import ImageCarousel from "./ImageCarousel";
import { PercentageCircle } from "../utils/PercentageCircle";
import { FaLocationArrow } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const {
    price,
    description,
    location,
    imageURL,
    _id,
    isFavourite,
    propertySize,
    matchScore,
    latitude,
    longitude,
    furnishing,
    leaseType,
  } = property;

  const overviewSprite = "https://assets.nobroker.in/nob-forum/icons.svg";
  return (
    <div className="property-card" key={_id}>
      <div className="image-container">
        <ImageCarousel images={imageURL} id={_id} favourite={isFavourite} />
      </div>
      <div className="property-info">
        <div className="property-details-container">
          <div className="property-details-wrapper">
            <div className="price">${price}</div>
            <div className="details">{description}</div>
            <div
              className="address"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${latitude},${longitude}`
                )
              }
            >
              {location} <FaLocationArrow className="redirect-icon" />
            </div>
          </div>
          <div className="circle-container">
            <div className="circle">
              <PercentageCircle circleSize={50} percent={matchScore} />
            </div>
          </div>
        </div>
        <div className="info-container">
          <div className="info-item">
            <div
              className="icon icon-1"
              style={{ backgroundImage: `url(${overviewSprite})` }}
            ></div>
            <div className="text">
              {propertySize ? `${propertySize} Sqft` : "Built Up Area"}
            </div>
          </div>
          <div className="info-item">
            <div
              className="icon icon-2"
              style={{ backgroundImage: `url(${overviewSprite})` }}
            ></div>
            <div className="text">{furnishing}</div>
          </div>
          <div className="info-item">
            <div
              className="icon icon-3"
              style={{ backgroundImage: `url(${overviewSprite})` }}
            ></div>
            <div className="text">{leaseType}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
