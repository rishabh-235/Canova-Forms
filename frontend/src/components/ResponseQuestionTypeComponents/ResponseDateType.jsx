import { useState } from "react";
function ResponseDateType({ questionId, onResponseChange, value }) {
  const [selectedDate, setSelectedDate] = useState(value || "");
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedDate(newValue);
    if (onResponseChange) {
      onResponseChange(questionId, newValue);
    }
  };
  return (
    <input
      type="date"
      className="date-type-input"
      value={selectedDate}
      onChange={handleChange}
    />
  );
}
export default ResponseDateType;



