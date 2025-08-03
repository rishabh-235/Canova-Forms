import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCondition,
  removeCondition,
} from "../../redux/slices/state/formstateslice";
function LinearScaleType({ questionId }) {
  const [scaleValue, setScaleValue] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const { isConditionActive } = useSelector((state) => state.form);
  const { pageNo } = useParams();
  const dispatch = useDispatch();
  const currentPageNumber = parseInt(pageNo) || 1;
  const handleScaleChange = (e) => {
    if (!isConditionActive) return;
    const newValue = parseInt(e.target.value);
    setScaleValue(newValue);
    if (questionId) {
      if (selectedCondition !== null) {
        dispatch(
          removeCondition({
            pageNumber: currentPageNumber,
            questionId: questionId,
            conditionText: selectedCondition.toString(),
          })
        );
      }
      dispatch(
        addCondition({
          pageNumber: currentPageNumber,
          questionId: questionId,
          conditionText: newValue.toString(),
        })
      );
      setSelectedCondition(newValue);
    }
  };
  return (
    <div className="linear-scale-type-container">
      <div className="linear-scale-type-header">
        <p>Scale Starting</p>
        <p>Scale Ending</p>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={scaleValue}
        disabled={!isConditionActive}
        onChange={handleScaleChange}
      />
    </div>
  );
}
export default LinearScaleType;



