import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addOption,
  removeOption,
  updateOption,
  addCondition,
  removeCondition,
} from "../../redux/slices/state/formstateslice";
function RadioType({
  question_no,
  sectionIndex,
  options: questionOptions,
  questionId,
}) {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const dispatch = useDispatch();
  const { isConditionActive } = useSelector((state) => state.form);
  const { pageNo } = useParams();
  const currentPageNumber = parseInt(pageNo) || 1;

  // Initialize with one empty option if no options exist
  useEffect(() => {
    if (!questionOptions || questionOptions.length === 0) {
      dispatch(
        addOption({
          pageNumber: currentPageNumber,
          questionId,
        })
      );
    }
  }, []);

  const handleOptionTextChange = (optionId, value) => {
    dispatch(
      updateOption({
        pageNumber: currentPageNumber,
        questionId,
        optionId,
        text: value,
      })
    );
  };

  const handleKeyDown = (e, optionId, optionIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Add new option
      dispatch(
        addOption({
          pageNumber: currentPageNumber,
          questionId,
        })
      );
    } else if (
      e.key === "Backspace" &&
      questionOptions[optionIndex]?.text === "" &&
      questionOptions.length > 1
    ) {
      e.preventDefault();
      // Remove option
      dispatch(
        removeOption({
          pageNumber: currentPageNumber,
          questionId,
          optionId,
        })
      );
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
      {(questionOptions || []).map((option, idx) => (
        <div
          className="radio-option"
          key={option.optionId || option._id || idx}
        >
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
              value={option.text || ""}
              onChange={(e) =>
                handleOptionTextChange(
                  option.optionId || option._id,
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, option.optionId || option._id, idx)
              }
            />
            {isConditionActive && (
              <input
                type="radio"
                id={`condition-input-${option.optionId || option._id}`}
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
