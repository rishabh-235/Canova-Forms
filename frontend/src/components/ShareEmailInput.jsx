import { useState } from "react";
import { useDispatch } from "react-redux";
import { addShareEmail } from "../redux/slices/state/formstateslice";
function ShareEmailInput({ email, index }) {
  const [emailInput, setEmailInput] = useState(email?.email || "");
  const dispatch = useDispatch();
  const [toggleEditOptions, setToggleEditOptions] = useState(false);
  return (
    <div>
      <input
        type="text"
        id="manage-share"
        placeholder="Enter email to share"
        value={emailInput}
        onChange={(e) => {
          setEmailInput(e.target.value);
          dispatch(
            addShareEmail({
              email: e.target.value,
              index,
              type: email?.type || "view",
            })
          );
        }}
      />
      <button
        className="edit-email-button"
        onClick={() => setToggleEditOptions(!toggleEditOptions)}
      >
        {email?.type || "view"}
      </button>
      {toggleEditOptions && (
        <ul className="edit-options">
          <li
            onClick={() => {
              dispatch(
                addShareEmail({ email: emailInput, index, type: "edit" })
              );
              setToggleEditOptions(false);
            }}
          >
            Edit
          </li>
          <li
            onClick={() => {
              dispatch(
                addShareEmail({ email: emailInput, index, type: "view" })
              );
              setToggleEditOptions(false);
            }}
          >
            View
          </li>
          <li
            onClick={() => {
              dispatch(
                addShareEmail({ email: emailInput, index, type: "remove" })
              );
              setToggleEditOptions(false);
            }}
          >
            Remove
          </li>
        </ul>
      )}
    </div>
  );
}
export default ShareEmailInput;



