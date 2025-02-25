import React, { useState } from "react";
import "./toogle.css";

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <button className={`toggle-button ${isDarkMode ? "active" : ""}`} onClick={toggleDarkMode}>
      {isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ToggleButton;
