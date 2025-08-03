import { useState } from "react";
function ResponseCheckboxType({
  questionId,
  options,
  onResponseChange,
  value,
}) {
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const handleOptionToggle = (optionText) => {
    let newSelectedOptions;
    if (selectedOptions.includes(optionText)) {
      newSelectedOptions = selectedOptions.filter(
        (option) => option !== optionText
      );
    } else {
      newSelectedOptions = [...selectedOptions, optionText];
    }
    setSelectedOptions(newSelectedOptions);
    if (onResponseChange) {
      onResponseChange(questionId, newSelectedOptions);
    }
  };
  return (
    <div className="checkbox-type-container">
      {options?.map((option, idx) => (
        <div className="checkbox-option" key={idx}>
          <input
            type="checkbox"
            id={`${questionId}-option-${idx}`}
            value={option.text}
            checked={selectedOptions.includes(option.text)}
            onChange={() => handleOptionToggle(option.text)}
            className="option-input-checkbox"
          />
          <label
            htmlFor={`${questionId}-option-${idx}`}
            className="checkbox-option-label"
          >
            <span className="option-text">{option.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
export default ResponseCheckboxType;



