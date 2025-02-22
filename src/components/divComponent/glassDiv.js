import React from "react";
import  BarrelGlass from './headerWrap'
import "./glassDiv.css"; 

const GlassPanel = () => {
  return (
    <div className="glass-panel">
      <BarrelGlass />
      <BarrelGlass />
    </div>
  );
};

export default GlassPanel;
