import ProjectCard from "../../components/ProjectCard";
import { useGetProjectsQuery } from "../../redux/slices/api/form.api";
import "../style/projectpagestyle.css";
function ProjectPage() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="homepage-container">
      <div className="homepage-title">Welcome to CANOVA</div>
      <div className="homepage-content">
        <section className="project-list">
          {projects && projects?.projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </section>
      </div>
    </div>
  );
}
export default ProjectPage;



