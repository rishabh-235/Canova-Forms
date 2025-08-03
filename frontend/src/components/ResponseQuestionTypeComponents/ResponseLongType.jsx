import { useState } from "react";
function ResponseLongType({ questionId, onResponseChange, value }) {
  const [answer, setAnswer] = useState(value || "");
  const handleChange = (e) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    if (onResponseChange) {
      onResponseChange(questionId, newValue);
    }
  };
  return (
    <textarea
      className="long-type-input"
      placeholder="Write your answer here..."
      minLength={10}
      value={answer}
      onChange={handleChange}
      rows={4}
    />
  );
}
export default ResponseLongType;



