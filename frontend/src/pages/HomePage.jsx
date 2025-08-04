import { useState } from "react";
import CreateProjectCard from "../components/CreateProjectCard";
import FormCard from "../components/FormCard";
import ProjectCard from "../components/ProjectCard";
import "./style/homepagestyle.css";
import {
  useGetRecentWorksQuery,
  useGetSharedWorksQuery,
} from "../redux/slices/api/form.api";
function HomePage() {
  const [togglecreateProjectCard, setToggleCreateProjectCard] = useState(false);
  const { data: sharedWorks = [], isLoading: isLoadingShared } =
    useGetSharedWorksQuery();
  const { data: recentWorks = [], isLoading } = useGetRecentWorksQuery();

  return (
    <div className="homepage-container">
      <div className="homepage-title">Welcome to CANOVA</div>
      <div className="homepage-content">
        <section className="create-project-section">
          <div
            onClick={() => setToggleCreateProjectCard(!togglecreateProjectCard)}
            className="create-project-button"
          >
            <div>
              <svg
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 9.44444H1M1 2.05556C1 1.7756 1.11645 1.50712 1.32372 1.30917C1.531 1.11121 1.81213 1 2.10526 1H8.73684L11.5 4.16667H20.8947C21.1879 4.16667 21.469 4.27788 21.6763 4.47583C21.8836 4.67379 22 4.94227 22 5.22222V18.9444C22 19.2244 21.8836 19.4929 21.6763 19.6908C21.469 19.8888 21.1879 20 20.8947 20H2.10526C1.81213 20 1.531 19.8888 1.32372 19.6908C1.11645 19.4929 1 19.2244 1 18.9444V2.05556Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Start From Scratch</p>
            <p className="create-project-description">
              Create a New Project Now
            </p>
          </div>
          <div
            onClick={() => setToggleCreateProjectCard(!togglecreateProjectCard)}
            className="create-project-button"
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 20H19C19.2652 20 19.5196 20.1054 19.7071 20.2929C19.8946 20.4804 20 20.7348 20 21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21C4 20.7348 4.10536 20.4804 4.29289 20.2929C4.48043 20.1054 4.73478 20 5 20ZM4 15L14 5L17 8L7 18H4V15ZM15 4L17 2L20 5L17.999 7.001L15 4Z"
                  fill="#FAFAF9"
                />
              </svg>
            </div>
            <p>Create Form</p>
            <p className="create-project-description">Create a New Form Now</p>
          </div>
        </section>
        <section className="recent-works-section">
          <p>Recent Works</p>
          <div className="form-list">
            {isLoading ? (
              <p>Loading recentWorks...</p>
            ) : (
              recentWorks?.forms?.map((work) => (
                <FormCard key={work._id} form={work} />
              ))
            )}
            {recentWorks?.projects?.map((work) => (
              <ProjectCard key={work._id} project={work} />
            ))}
          </div>
        </section>
        <section>
          <p>Shared Works</p>
          <div className="form-list">
            {isLoadingShared ? (
              <p>Loading sharedWorks...</p>
            ) : (
              sharedWorks?.sharedForms?.map((work, index) => (
                <FormCard key={work._id} form={work} />
              ))
            )}
            {sharedWorks?.sharedProjects?.map((work, index) => (
              <ProjectCard key={work._id} project={work} />
            ))}
          </div>
        </section>
      </div>
      {togglecreateProjectCard && (
        <CreateProjectCard
          toggleCreateProjectCard={togglecreateProjectCard}
          setToggleCreateProjectCard={setToggleCreateProjectCard}
        />
      )}
    </div>
  );
}
export default HomePage;
