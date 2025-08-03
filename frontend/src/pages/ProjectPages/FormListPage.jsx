import { useNavigate, useParams } from "react-router-dom";
import FormCard from "../../components/FormCard";
import "../style/formlistpagestye.css";
import {
  useCreateFormMutation,
  useGetFormsQuery,
} from "../../redux/slices/api/form.api";
import { toast } from "react-toastify";
function FormListPage() {
  const { projectid } = useParams();
  const { projectname } = useParams();
  const { data: forms, isLoading } = useGetFormsQuery(projectid);
  const navigate = useNavigate();
  const [createFormMutation] = useCreateFormMutation();

  const createForm = () => {
    createFormMutation({
      formTitle: "New Form",
      projectId: projectid,
    })
      .unwrap()
      .then((response) => {
        console.log(response)
        if (response.form) {
          toast.success("New form created");
          navigate(`/create-form/${response.form._id}/1`);
        } else {
          toast.error("Form is not created!");
        }
      })
      .catch((error) => {
        console.error("Error creating form:", error);
        toast.error("Error creating form!");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="homepage-container">
      <div className="homepage-title">{projectname}</div>
      <div className="homepage-content">
        <section className="project-list">
          {forms === undefined ? (
            <p>No forms available</p>
          ) : (
            forms?.forms.map((form, index) => (
              <FormCard key={index} form={form} />
            ))
          )}
          <button onClick={createForm} className="project-create-form-button">
            Create New Form
          </button>
        </section>
      </div>
    </div>
  );
}
export default FormListPage;
