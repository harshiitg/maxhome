// ImageCarousel.js
import React, { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./PropertyCard.css";
import HomeSaved from "./HomeSaved";

const ImageCarousel = ({ images, id, favourite }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const apiBaseUrl = "http://localhost:5001"

  const dotsPerPage = 5;

  const nextImage = () => {
    const newIndex = (activeImageIndex + 1) % images.length;
    setActiveImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(newIndex);
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    axios
      .post(`${apiBaseUrl}/api/toggleFavourite`, { propertyId: id })
      .then((response) => {
        console.log("Toggle favorite status successful:", response.data);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000); // Hide after 3 seconds
      })
      .catch((error) => {
        console.error("Error toggling favorite status:", error);
      });
  };

  const renderDots = () => {
    const startIndex =
      activeImageIndex - Math.floor(dotsPerPage / 2) >= 0
        ? activeImageIndex - Math.floor(dotsPerPage / 2)
        : 0;
    const endIndex =
      startIndex + dotsPerPage < images.length
        ? startIndex + dotsPerPage
        : images.length;

    return images
      .slice(startIndex, endIndex)
      .map((_, index) => (
        <div
          key={startIndex + index}
          className={`dot ${
            startIndex + index === activeImageIndex ? "active" : ""
          }`}
          onClick={() => setActiveImageIndex(startIndex + index)}
        ></div>
      ));
  };

  return (
    <div className="image-carousel">
      <HomeSaved isVisible={isNotificationVisible} />
      <div className="image-container">
        <FaHeart
          className={`heart-style ${isFavourite ? "active" : ""}`}
          onClick={toggleFavourite}
        />
        <img
          src={`https://images.nobroker.in/images/${images[activeImageIndex]}`}
          alt="Property"
          height="300px"
          loading="lazy"
        />
        {activeImageIndex !== 0 ? (
          <button className="prev-button" onClick={prevImage}></button>
        ) : null}
        {activeImageIndex !== images.length - 1 ? (
          <button className="next-button" onClick={nextImage}></button>
        ) : null}
      </div>
      <div className="image-dots">{renderDots()}</div>
    </div>
  );
};

export default ImageCarousel;
