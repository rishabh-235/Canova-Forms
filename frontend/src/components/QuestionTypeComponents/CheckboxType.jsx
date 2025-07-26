import React from "react";

function CheckboxType({ question_no = 1 }) {
  return (
    <div className="checkbox-type-container">
      <div className="checkbox-option">
        <input
          type="checkbox"
          value="option1"
          name={`question-${question_no}`}
          //   checked={selectedOption === "option1"}
          //   onChange={handleOptionChange}
        />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div className="checkbox-option">
        <input
          type="checkbox"
          value="option2"
          name={`question-${question_no}`}
          //   checked={selectedOption === "option2"}
          //   onChange={handleOptionChange}
        />
        <label htmlFor="option2">Option 2</label>
      </div>
      <div className="checkbox-option">
        <input
          type="checkbox"
          value="option3"
          name={`question-${question_no}`}
          //   checked={selectedOption === "option3"}
          //   onChange={handleOptionChange}
        />
        <label htmlFor="option3">Option 3</label>
      </div>
      <div className="checkbox-option">
        <input
          type="checkbox"
          value="option4"
          name={`question-${question_no}`}
          //   checked={selectedOption === "option4"}
          //   onChange={handleOptionChange}
        />
        <label htmlFor="option4">Option 4</label>
      </div>
    </div>
  );
}

export default CheckboxType;
