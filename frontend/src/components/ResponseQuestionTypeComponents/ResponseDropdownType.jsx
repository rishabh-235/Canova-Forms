import { useState } from "react";
function ResponseDropdownType({
  questionId,
  options,
  onResponseChange,
  value,
}) {
  const [selectedOption, setSelectedOption] = useState(value || "");
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    if (onResponseChange) {
      onResponseChange(questionId, newValue);
    }
  };
  return (
    <div className="dropdown-type-container">
      <select
        className="option-input-dropdown-select"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        {options?.map((option, index) => (
          <option key={index} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
export default ResponseDropdownType;



