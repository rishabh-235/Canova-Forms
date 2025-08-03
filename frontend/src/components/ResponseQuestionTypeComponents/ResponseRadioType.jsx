import { useState } from "react";
function ResponseRadioType({ questionId, options, onResponseChange, value }) {
  const [selectedOption, setSelectedOption] = useState(value || "");
  const handleOptionSelect = (optionText) => {
    setSelectedOption(optionText);
    if (onResponseChange) {
      onResponseChange(questionId, optionText);
    }
  };
  return (
    <div className="radio-type-container">
      {options?.map((option, idx) => (
        <div className="radio-option" key={idx}>
          <input
            type="radio"
            id={`${questionId}-option-${idx}`}
            name={`question-${questionId}`}
            value={option.text}
            checked={selectedOption === option.text}
            onChange={() => handleOptionSelect(option.text)}
            className="option-input-radio"
          />
          <label
            htmlFor={`${questionId}-option-${idx}`}
            className="radio-option-label"
          >
            <span className="option-text">{option.text}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
export default ResponseRadioType;



