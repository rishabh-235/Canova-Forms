import React, { useState } from "react";
import { Link } from "react-router-dom";

function AnalysisProjectCard() {
  const [toggleOptions, setToggleOptions] = useState(false);
  return (
    <div className="project-card-container">
      <Link to="/analysis/projects" className="project-card-body">
        <svg
          width="60"
          height="60"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M82.4167 33.8426H7.16675M7.16675 7.36575C7.16675 6.36259 7.58402 5.40052 8.32676 4.69118C9.0695 3.98185 10.0769 3.58334 11.1273 3.58334H34.8904L44.7917 14.9306H78.4562C79.5066 14.9306 80.514 15.3291 81.2567 16.0384C81.9995 16.7477 82.4167 17.7098 82.4167 18.713V67.8843C82.4167 68.8874 81.9995 69.8495 81.2567 70.5588C80.514 71.2682 79.5066 71.6667 78.4562 71.6667H11.1273C10.0769 71.6667 9.0695 71.2682 8.32676 70.5588C7.58402 69.8495 7.16675 68.8874 7.16675 67.8843V7.36575Z"
            stroke="white"
            stroke-width="4"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
      <div className="project-card-footer">
        <p>Project Name</p>
        <svg
          width="4"
          height="18"
          viewBox="0 0 4 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: "pointer" }}
          onClick={() => setToggleOptions(!toggleOptions)}
        >
          <circle cx="2" cy="2" r="2" fill="black" />
          <circle cx="2" cy="12" r="2" fill="black" />
          <circle cx="2" cy="22" r="2" fill="black" />
        </svg>
        <div className={`form-card-options ${toggleOptions ? "show" : ""}`}>
          <button>Share</button>
          <button>Rename</button>
          <button>Copy</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisProjectCard;
