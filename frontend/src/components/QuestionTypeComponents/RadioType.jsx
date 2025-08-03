import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addOption,
  addCondition,
  removeCondition,
} from "../../redux/slices/state/formstateslice";
function RadioType({
  question_no,
  sectionIndex,
  options: questionOptions,
  questionId,
}) {
  const [options, setOptions] = useState(questionOptions);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const dispatch = useDispatch();
  const { isConditionActive } = useSelector((state) => state.form);
  const { pageNo } = useParams();
  const currentPageNumber = parseInt(pageNo) || 1;
  useEffect(() => {
    if (questionOptions.length === 0) {
      setOptions([{ text: "" }]);
    } else {
      setOptions(questionOptions);
    }
    dispatch(
      addOption({ sectionIndex, questionIndex: question_no - 1, options })
    );
  }, []);
  const handleOptionTextChange = (id, value) => {
    setOptions((prev) => {
      const updatedOptions = prev.map((opt) =>
        opt.id === id ? { ...opt, text: value } : opt
      );
      dispatch(
        addOption({
          sectionIndex,
          questionIndex: question_no - 1,
          options: updatedOptions,
        })
      );
      return updatedOptions;
    });
  };
  const handleKeyDown = (e, id, idx) => {
    if (e.key === "Enter") {
      setOptions((prev) => {
        const updatedOptions = [...prev, { text: "" }];
        dispatch(
          addOption({
            sectionIndex,
            questionIndex: question_no - 1,
            options: updatedOptions,
          })
        );
        return updatedOptions;
      });
    } else if (
      e.key === "Backspace" &&
      options[idx]?.text === "" &&
      options.length > 1
    ) {
      setOptions((prev) => {
        const updatedOptions = prev.filter((opt) => opt.id !== id);
        dispatch(
          addOption({
            sectionIndex,
            questionIndex: question_no - 1,
            options: updatedOptions,
          })
        );
        return updatedOptions;
      });
    }
  };
  const handleChangeConditionInput = (optionText, isChecked) => {
    if (!questionId) return;
    if (isChecked) {
      if (selectedCondition !== null) {
        dispatch(
          removeCondition({
            pageNumber: currentPageNumber,
            questionId: questionId,
            conditionText: selectedCondition,
          })
        );
      }
      setSelectedCondition(optionText);
      dispatch(
        addCondition({
          pageNumber: currentPageNumber,
          questionId: questionId,
          conditionText: optionText,
        })
      );
    } else {
      if (selectedCondition === optionText) {
        setSelectedCondition(null);
        dispatch(
          removeCondition({
            pageNumber: currentPageNumber,
            questionId: questionId,
            conditionText: optionText,
          })
        );
      }
    }
  };
  return (
    <div className="radio-type-container">
      {options.map((option, idx) => (
        <div className="radio-option" key={option.id || idx}>
          <input
            type="radio"
            value={`option${idx + 1}`}
            name={`question-${question_no}`}
            className="option-input-radio"
          />
          <label className="radio-option-label">
            <input
              type="text"
              placeholder="Enter option text"
              className="option-input-text"
              value={option.text}
              onChange={(e) =>
                handleOptionTextChange(option.id, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(e, option.id, idx)}
            />
            {isConditionActive && (
              <input
                type="radio"
                id={`condition-input-${option.id}`}
                name={`condition-question-${question_no}`}
                className="option-input-radio"
                checked={selectedCondition === option.text}
                onChange={(e) =>
                  handleChangeConditionInput(option.text, e.target.checked)
                }
              />
            )}
          </label>
        </div>
      ))}
    </div>
  );
}
export default RadioType;



