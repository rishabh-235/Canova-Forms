import { useParams } from "react-router-dom";
import FormCard from "../../components/FormCard";
import "../style/formlistpagestye.css";
import { useGetFormsQuery } from "../../redux/slices/api/form.api";
function FormListPage() {
  const { projectid } = useParams();
  const { projectname } = useParams();
  const { data: forms, isLoading } = useGetFormsQuery(projectid);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="homepage-container">
      <div className="homepage-title">{projectname}</div>
      <div className="homepage-content">
        <section className="project-list">
            {forms.forms.map((form, index) => (
              <FormCard key={index} form={form} />
            ))}
            <button className="project-create-form-button">Create New Form</button>
        </section>
      </div>
    </div>
  );
}
export default FormListPage;



