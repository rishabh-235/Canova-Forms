import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ResponseFormQuestionCard from "../../components/ResponseFormQuestionCard";
import {
  setResponse,
  nextPage,
  previousPage,
  submitForm,
  resetFormResponse,
} from "../../redux/slices/formResponseSlice";
import { useGetResponseFormQuery } from "../../redux/slices/api/form.api";
import "../style/formpreviewpagestyle.css";
import "../style/responseformstyle.css";
import { toast } from "react-toastify";
function ResponseForm() {
  const { responseFormId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!responseFormId) return <div>No Form ID provided</div>;
  const {
    data: formData,
    error,
    isLoading,
  } = useGetResponseFormQuery(responseFormId);
  const { responses, currentPageIndex, isSubmitted } = useSelector(
    (state) => state.formResponse
  );
  const currentForm = formData?.form;
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    dispatch(resetFormResponse());
  }, [responseFormId]);
  const handleResponseChange = (questionId, value) => {
    dispatch(setResponse({ questionId, value }));
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };
  const validateCurrentPage = () => {
    if (!currentForm || !currentForm.pages[currentPageIndex]) return true;
    const currentPage = currentForm.pages[currentPageIndex];
    const errors = {};
    let isValid = true;
    currentPage.sections?.forEach((section) => {
      section.questions?.forEach((question) => {
        if (question.required && !responses[question.questionId]) {
          errors[question.questionId] = "This field is required";
          isValid = false;
        }
      });
    });
    setValidationErrors(errors);
    return isValid;
  };
  const handleNextPage = () => {
    if (validateCurrentPage()) {
      if (currentPageIndex < currentForm.pages.length - 1) {
        dispatch(nextPage());
        navigate("/response-form/" + responseFormId + "/" + (currentPageIndex + 2));
      }
    }
  };
  const handlePreviousPage = () => {
    dispatch(previousPage());
  };
  const handleSubmit = async () => {
    if (!validateCurrentPage()) return;
    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your response...");

    try {
      console.log("Form responses:", responses);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(submitForm({ submissionId: Date.now().toString() }));

      toast.update(loadingToast, {
        render:
          "Response submitted successfully! Thank you for your participation.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.update(loadingToast, {
        render:
          "Failed to submit response. Please check your connection and try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return (
      <div className="form-preview-container">
        <div className="loading-message">Loading form...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="form-preview-container">
        <div className="error-message">
          {error.data?.message || "Failed to load form"}
        </div>
      </div>
    );
  }
  if (isSubmitted) {
    return (
      <div className="form-preview-container">
        <div className="success-message">
          <h2>Thank you!</h2>
          <p>Your response has been submitted successfully.</p>
        </div>
      </div>
    );
  }
  if (!currentForm) {
    return (
      <div className="form-preview-container">
        <div>Form not found</div>
      </div>
    );
  }
  const currentPage = currentForm.pages[currentPageIndex];
  const isLastPage = currentPageIndex === currentForm.pages.length - 1;
  return (
    <div className="form-preview-container">
      <div
        className="form-preview-logo-container"
        style={{ position: "fixed", top: "30px", left: "10px", zIndex: "1000" }}
      >
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
          <div className="form-preview-title">{currentForm?.formTitle}</div>
        </div>
        <div className="form-preview-content" style={{ padding: "0px" }}>
          <section className="form-editor-section">
            <div
              id="form-question-container"
              className="form-question-container"
              style={{ backgroundColor: `${currentForm?.backgroundColor}` }}
            >
              {currentPage?.sections.map((section, sectionIndex) => (
                <section
                  className="question-section"
                  style={{ backgroundColor: `${section?.backgroundColor}` }}
                  key={sectionIndex}
                >
                  {section.questions.map((question, questionIndex) => (
                    <div key={question.questionId}>
                      <ResponseFormQuestionCard
                        question_no={questionIndex + 1}
                        question_text={question.questionText}
                        question_type={question.type}
                        questionImage={question.image}
                        questionVideo={question.video}
                        options={question.options}
                        questionId={question.questionId}
                        onResponseChange={handleResponseChange}
                        responseValue={responses[question.questionId]}
                        isRequired={question.required}
                      />
                      {validationErrors[question.questionId] && (
                        <div className="error-message">
                          {validationErrors[question.questionId]}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="form-navigation">
        {currentPageIndex > 0 && (
          <button className="previous-page-button" onClick={handlePreviousPage}>
            Previous Page
          </button>
        )}
        {!isLastPage ? (
          <button className="next-page-button" onClick={handleNextPage}>
            Next Page
          </button>
        ) : (
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
export default ResponseForm;
