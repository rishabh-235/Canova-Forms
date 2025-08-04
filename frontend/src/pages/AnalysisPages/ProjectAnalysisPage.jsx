import { useParams } from "react-router-dom";
// import FormCard from "../../components/FormCard";
import LineChart from "../../components/LineChart";
import "../style/projectanalysispagestyle.css";
import { useGetRecentWorksQuery } from "../../redux/slices/api/form.api";
import AnalysisFormCard from "../../components/AnalysisFormCard";
function ProjectAnalysisPage() {
  const { projectName } = useParams();
  const { data: recentWorks = [], isLoading } = useGetRecentWorksQuery();

  return (
    <div className="homepage-container">
      <div className="homepage-title">{projectName}</div>
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
            {isLoading ? (
              <p>Loading recentWorks...</p>
            ) : (
              recentWorks?.forms?.map((work) => (
                <AnalysisFormCard key={work._id} form={work} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export default ProjectAnalysisPage;
