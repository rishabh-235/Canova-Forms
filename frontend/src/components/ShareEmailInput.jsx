import React, { useState } from "react";

function ShareEmailInput() {
  const [toggleEditOptions, setToggleEditOptions] = useState(false);
  return (
    <div>
      <input type="text" id="manage-share" placeholder="Enter email to share" />
      <button
        className="edit-email-button"
        onClick={() => setToggleEditOptions(!toggleEditOptions)}
      >
        Edit
      </button>
      {toggleEditOptions && (
        <ul className="edit-options">
          <li>Edit</li>
          <li>View</li>
          <li>Remove</li>
        </ul>
      )}
    </div>
  );
}

export default ShareEmailInput;
