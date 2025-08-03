import { useState } from "react";
import "./style/conditioncardstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activateCondition, addConditionPage } from "../redux/slices/state/formstateslice";
function ConditionCard({ setToggleConditionCard }) {
  const [truePage, setTruePage] = useState("");
  const [falsePage, setFalsePage] = useState("");
  const { currentForm } = useSelector((state) => state.form);
  const { pageNo } = useParams();
  const dispatch = useDispatch();
  return (
    <div className="condition-card">
      <div className="condition-card-container">
        <div className="condition-card-header">
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={() => setToggleConditionCard(false)}
          >
            <path
              d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="condition-card-body">
          <p className="condition-card-title">Create Project</p>
          <p className="condition-card-description">
            if the conditions are all met, it lead the user to the page you have
            selected here.
          </p>
          <div>
            <label htmlFor="condition-text">Select, if it's true</label>
            <select
              className="list-true"
              onChange={(e) => setTruePage(e.target.value)}
              defaultValue={"default"}
            >
              <option value="default" disabled>Select a page</option>
              <option value="1">Page 1</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
            </select>
          </div>
          <div>
            <label htmlFor="condition-text">Select, if it's false</label>
            <select
              defaultValue={"default"}
              className="list-false"
              onChange={(e) => setFalsePage(e.target.value)}
            >
              <option value="default" disabled>Select a page</option>
              <option value="1">Page 1</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
            </select>
          </div>
        </div>
        <div className="condition-card-footer">
          <button onClick={()=>{
            if(truePage && falsePage) dispatch(addConditionPage({pageNo, truePage, falsePage}));
            else alert("True Page and False Page Both required");
            setToggleConditionCard(false);
            dispatch(activateCondition());
            }} className="condition-card-continue-button">Continue</button>
        </div>
      </div>
    </div>
  );
}
export default ConditionCard;



