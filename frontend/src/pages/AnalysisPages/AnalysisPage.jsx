import AnalysisFormCard from "../../components/AnalysisFormCard";
import AnalysisProjectCard from "../../components/AnalysisProjectCard";

function AnalysisPage() {
  return (
    <div className="homepage-container">
      <div className="homepage-title">Welcome to CANOVA</div>
      <div className="homepage-content">
        <section className="recent-works-section">
          <p>Recent Works</p>
          <div className="form-list">
            <AnalysisFormCard />
            <AnalysisFormCard />
            <AnalysisProjectCard />
          </div>
        </section>
        <section>
          <p>Shared Works</p>
          <div className="form-list">
            <AnalysisFormCard />
            <AnalysisProjectCard />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnalysisPage;
