import FormCard from "../../components/FormCard";
import LineChart from "../../components/LineChart";
import ProjectCard from "../../components/ProjectCard";
import "../style/projectanalysispagestyle.css";
function ProjectAnalysisPage() {
  return (
    <div className="homepage-container">
      <div className="homepage-title">Project Name</div>
      <div className="homepage-content">
        <section className="project-analysis-section">
          <div className="project-analysis-cards-container">
            <div className="view-analysis-card">
              <p>Views</p>
              <h3>7265</h3>
            </div>
            <div className="view-analysis-card">
              <p>Views</p>
              <h3>7265</h3>
            </div>
          </div>
          <div className="line-chart-container">
            <LineChart />
          </div>
        </section>
        <section className="recent-works-section">
          <p>Recent Works</p>
          <div className="form-list">
            <FormCard />
            <FormCard />
            <FormCard />
            <FormCard />
            <FormCard />
            <FormCard />
            <FormCard />
          </div>
        </section>
      </div>
    </div>
  );
}
export default ProjectAnalysisPage;



