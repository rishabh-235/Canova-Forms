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

function DropdownType({
  question_no,
  sectionIndex,
  options: questionOptions,
  questionId,
}) {
  const [selectedConditions, setSelectedConditions] = useState(new Set());
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
      setSelectedConditions((prev) => new Set([...prev, optionText]));
      dispatch(
        addCondition({
          pageNumber: currentPageNumber,
          questionId: questionId,
          conditionText: optionText,
        })
      );
    } else {
      setSelectedConditions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(optionText);
        return newSet;
      });
      dispatch(
        removeCondition({
          pageNumber: currentPageNumber,
          questionId: questionId,
          conditionText: optionText,
        })
      );
    }
  };

  return (
    <div className="dropdown-type-container">
      <div className="option-input-dropdown-list">
        {(questionOptions || []).map((option, idx) => (
          <div
            key={option.optionId || option._id || idx}
            className="option-input-dropdown-item"
          >
            <input
              value={option.text || ""}
              placeholder="Enter Dropdown text"
              onChange={(e) =>
                handleOptionTextChange(
                  option.optionId || option._id,
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, option.optionId || option._id, idx)
              }
              className="option-input-dropdown-text"
            />
            {isConditionActive && (
              <input
                type="checkbox"
                id={`condition-input-${option.optionId || option._id}`}
                className="option-input-checkbox"
                checked={selectedConditions.has(option.text)}
                onChange={(e) =>
                  handleChangeConditionInput(option.text, e.target.checked)
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownType;
