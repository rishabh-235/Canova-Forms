import AnalysisFormCard from "../../components/AnalysisFormCard";
import AnalysisProjectCard from "../../components/AnalysisProjectCard";
import { useGetRecentWorksQuery, useGetSharedWorksQuery } from "../../redux/slices/api/form.api";
function AnalysisPage() {
  const { data: recentWorks = [], isLoading } = useGetRecentWorksQuery();
  const { data: sharedWorks = [], isLoading: isLoadingShared } = useGetSharedWorksQuery();
  return (
    <div className="homepage-container">
      <div className="homepage-title">Welcome to CANOVA</div>
      <div className="homepage-content">
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
            {recentWorks?.projects?.map((work) => (
              <AnalysisProjectCard key={work._id} project={work} />
            ))}
          </div>
        </section>
        <section>
          <p>Shared Works</p>
          <div className="form-list">
            {isLoadingShared ? (
              <p>Loading sharedWorks...</p>
            ) : (
              sharedWorks?.forms?.map((work, index) => <AnalysisFormCard key={index} form={work} />)
            )}
            {sharedWorks?.projects?.map((work, index) => (
              <AnalysisProjectCard key={index} project={work} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default AnalysisPage;



