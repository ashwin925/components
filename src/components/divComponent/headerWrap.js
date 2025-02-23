import React from "react";
import "./headerWrap.css";
import me from '../images/me.jpg'

const BarrelGlass = () => {
  return (
    <div className="header-container">
      <div className="barrel-glass">
        <nav className="nav-links">
          <span className="glass-text">Home</span>
          <span className="glass-text">Skills</span>
          <span className="glass-text">Projects</span>
          <span className="glass-text">Contact Me</span>
        </nav>
      </div>
      <div className="image-holder">
        <img src={me} alt="Profile" className="profile-image" />
      </div>
    </div>
  );
};

export default BarrelGlass;
