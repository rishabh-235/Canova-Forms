import { Link } from "react-router-dom";
import "./style/createprojectcardstyle.css";

function CreateProjectCard({ toggleCreateProjectCard, setToggleCreateProjectCard }) {

  return (
    <div className="create-project-card">
      <div className="create-project-card-container">
        <div className="create-project-card-header">
          <div>
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 0L15 4.33012V12.9904L7.5 17.3205L0 12.9904V4.33012L7.5 0ZM1.66664 6.15836V12.0281L6.66664 14.9148V9.04512L1.66664 6.15836ZM13.3333 6.1584L8.33332 9.04512V14.9148L13.3333 12.0281V6.1584ZM7.5 1.92449L2.58332 4.76316L7.5 7.60176L12.4167 4.76309L7.5 1.92449Z"
                fill="black"
              />
            </svg>
          </div>

          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={() => setToggleCreateProjectCard(!toggleCreateProjectCard)}
          >
            <path
              d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className="create-project-card-body">
          <p className="create-project-title">Create Project</p>
          <p className="create-project-description">Provide your project a name and start with your journey</p>

          <div>
            <label htmlFor="project-name">Project Name</label>
            <input type="text" id="project-name" placeholder="Project Name" />
          </div>

          <div>
            <label htmlFor="form-name">Form Name</label>
            <input type="text" id="form-name" placeholder="Form Name" />
          </div>

          <Link to="/create-form/01" className="create-project-card-button">Create Project</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectCard;
