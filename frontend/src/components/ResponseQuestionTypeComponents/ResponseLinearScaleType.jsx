import { useState } from "react";
function ResponseLinearScaleType({ questionId, onResponseChange, value }) {
  const [scaleValue, setScaleValue] = useState(value || 0);
  const handleScaleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setScaleValue(newValue);
    if (onResponseChange) {
      onResponseChange(questionId, newValue);
    }
  };
  return (
    <div className="linear-scale-type-container">
      <div className="linear-scale-type-header">
        <p>Scale Starting</p>
        <p>Scale Ending</p>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={scaleValue}
        onChange={handleScaleChange}
      />
    </div>
  );
}
export default ResponseLinearScaleType;



