import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addOption,
  addCondition,
  removeCondition,
} from "../../redux/slices/state/formstateslice";
function DropdownType({
  question_no,
  sectionIndex,
  options: questionOptions,
  questionId,
}) {
  const [options, setOptions] = useState(questionOptions);
  const [selectedConditions, setSelectedConditions] = useState(new Set());
  const dispatch = useDispatch();
  const { isConditionActive } = useSelector((state) => state.form);
  const { pageNo } = useParams();
  const currentPageNumber = parseInt(pageNo) || 1;
  useEffect(() => {
    if (questionOptions.length === 0) {
      setOptions([{ id: Date.now() + Math.random(), text: "" }]);
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
        const updatedOptions = [
          ...prev,
          { id: Date.now() + Math.random(), text: "" },
        ];
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
      options[idx].text === "" &&
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
        {options.map((option, idx) => (
          <div key={option.id} className="option-input-dropdown-item">
            <input
              key={option.id}
              value={option.text}
              placeholder="Enter Dropdown text"
              onChange={(e) =>
                handleOptionTextChange(option.id, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(e, option.id, idx)}
              className="option-input-dropdown-text"
            />
            {isConditionActive && (
              <input
                type="checkbox"
                name={`condition-question-${question_no}`}
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



