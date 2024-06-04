import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./HomeSaved.css";

const HomeSaved = ({ isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        document
          .querySelector(".save-notification")
          .classList.remove("visible");
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return ReactDOM.createPortal(
    <div className={`save-notification ${isVisible ? "visible" : ""}`}>
      Home saved
    </div>,
    document.getElementById("notification-root")
  );
};

export default HomeSaved;
