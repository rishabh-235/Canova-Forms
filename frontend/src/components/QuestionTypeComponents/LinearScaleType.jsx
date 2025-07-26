import React from "react";

function LinearScaleType() {
  return (
    <div className="linear-scale-type-container">
      <div className="linear-scale-type-header">
        <p>Scale Starting</p>
        <p>Scale Ending</p>
      </div>
      <input type="range" min="0" max="10" />
    </div>
  );
}

export default LinearScaleType;
