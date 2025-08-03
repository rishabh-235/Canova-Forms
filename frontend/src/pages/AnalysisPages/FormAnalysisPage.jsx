import ColumnChart from "../../components/ColumnChart";
import "../style/formanalyispagestyle.css";
function FormAnalysisPage() {
  return (
    <div className="homepage-container">
      <button className="form-analysis-save-button">Save</button>
      <div className="homepage-title">Form Name</div>
      <div className="homepage-content">
        <section className="form-analysis-section">
          <h4>Page 01</h4>
          <div className="form-question-list">
            <div>
              <ColumnChart />
            </div>
            <div>
              <ColumnChart />
            </div>
            <div>
              <ColumnChart />
            </div>
            <div>
              <ColumnChart />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default FormAnalysisPage;



