import FormCard from "../../components/FormCard";
import "../style/formlistpagestye.css";

function FormListPage() {
  return (
    <div className="homepage-container">
      <div className="homepage-title">Project Name</div>
      <div className="homepage-content">
        <section className="project-list">
            {new Array(20).fill(0).map((_, index) => (
              <FormCard key={index} />
            ))}
            <button className="project-create-form-button">Create New Form</button>
        </section>
      </div>
    </div>
  );
}

export default FormListPage;
