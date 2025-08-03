import { useState } from "react";
function ResponseShortType({ questionId, onResponseChange, value }) {
  const [answer, setAnswer] = useState(value || "");
  const handleChange = (e) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    if (onResponseChange) {
      onResponseChange(questionId, newValue);
    }
  };
  return (
    <input
      className="short-type-input"
      type="text"
      placeholder="write Your Answer"
      value={answer}
      onChange={handleChange}
    />
  );
}
export default ResponseShortType;



