import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "../redux/slices/api/form.api";
import "./style/createprojectcardstyle.css";
import { toast } from "react-toastify";
function CreateProjectCard({
  toggleCreateProjectCard,
  setToggleCreateProjectCard,
}) {
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const projectName = e.target.projectName.value.trim();
    const formTitle = e.target.formTitle.value.trim();

    if (!projectName || !formTitle) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = {
      projectName,
      formTitle,
    };

    const loadingToast = toast.loading("Creating project...");

    try {
      const response = await createProject(formData).unwrap();
      toast.update(loadingToast, {
        render: "Project created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate(`/create-form/${response.form._id}/1}`);
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to create project. Please try again.";
      toast.update(loadingToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
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
                fillRule="evenodd"
                clipRule="evenodd"
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
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <form
          className="create-project-card-body"
          onSubmit={handleCreateProject}
        >
          <p className="create-project-title">Create Project</p>
          <p className="create-project-description">
            Provide your project a name and start with your journey
          </p>
          <div>
            <label htmlFor="project-name">Project Name</label>
            <input
              type="text"
              id="project-name"
              name="projectName"
              placeholder="Project Name"
            />
          </div>
          <div>
            <label htmlFor="form-name">Form Name</label>
            <input
              type="text"
              id="form-name"
              name="formTitle"
              placeholder="Form Name"
            />
          </div>
          <button className="create-project-card-button">Create Project</button>
        </form>
      </div>
    </div>
  );
}
export default CreateProjectCard;
