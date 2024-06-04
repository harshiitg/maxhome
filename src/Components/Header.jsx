import React from "react";
import "./Header.css";
import { loadImage } from "../utils/LoadImage";

const Header = () => {
  const imageURL =
    "https://www.maxhome.ai/static/media/maxhome.c10f207c084c854e9274122524b4aa25.svg";
  return (
    <div className="header">
      <div className="image">{loadImage(imageURL, "MaxHome", "24ʼpx")}</div>
      <div className="header-text">Listings</div>
    </div>
  );
};

export default Header;
