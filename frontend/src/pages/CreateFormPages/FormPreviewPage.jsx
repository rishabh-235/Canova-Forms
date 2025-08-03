import { useSelector } from "react-redux";
import FormQuestionCard from "../../components/FormQuestionCard";
import "../style/formpreviewpagestyle.css";
function FormPreviewPage() {
  const { currentForm } = useSelector((state) => state.form);
  return (
    <div className="form-preview-container">
      <div className="form-preview-logo-container">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="3" fill="white" />
          <path
            d="M12.8391 7.1609C16.6724 10.9942 18.5074 15.3717 16.9391 16.9401C15.3724 18.5076 10.9932 16.6717 7.16072 12.8392C3.32822 9.00673 1.49239 4.6284 3.06072 3.06007C4.62739 1.49257 9.00572 3.3284 12.8391 7.1609Z"
            stroke="#151515"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.79154 9.99999H10.2082M7.16154 7.16082C3.32821 10.9942 1.49237 15.3717 3.06071 16.94C4.62904 18.5083 9.00654 16.6717 12.839 12.8392C16.6715 9.00665 18.5082 4.62832 16.9399 3.05999C15.3715 1.49165 10.994 3.32832 7.16154 7.16082Z"
            stroke="#151515"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="logo-text">CANOVA</p>
      </div>
      <div
        style={{
          backgroundColor: `${currentForm?.backgroundColor}`,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div className="form-preview-header">
          <div className="form-preview-title">Title</div>
        </div>
        <div className="form-preview-content" style={{ padding: "0px" }}>
          <section className="form-editor-section">
            <div
              id="form-question-container"
              className="form-question-container"
              style={{ backgroundColor: `${currentForm?.backgroundColor}` }}
            >
              {currentForm?.pages[0]?.sections.map((section, sindex) => (
                <section
                  className="question-section"
                  style={{ backgroundColor: `${section?.backgroundColor}` }}
                  key={sindex}
                >
                  {section.questions.map((question, qIndex) => (
                    <FormQuestionCard
                      key={question.questionId || question._id || qIndex}
                      question_no={qIndex + 1}
                      question_text={question.questionText}
                      question_type={question.type}
                      questionImage={question.image}
                      questionVideo={question.video}
                      section_index={sindex}
                      options={question.options}
                      questionId={question.questionId || question._id}
                    />
                  ))}
                </section>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default FormPreviewPage;



