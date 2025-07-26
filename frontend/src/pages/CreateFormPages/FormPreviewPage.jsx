import FormQuestionCard from "../../components/FormQuestionCard";
import QuestionCard from "../../components/QuestionCard";
import "../style/formpreviewpagestyle.css";

function FormPreviewPage() {
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.79154 9.99999H10.2082M7.16154 7.16082C3.32821 10.9942 1.49237 15.3717 3.06071 16.94C4.62904 18.5083 9.00654 16.6717 12.839 12.8392C16.6715 9.00665 18.5082 4.62832 16.9399 3.05999C15.3715 1.49165 10.994 3.32832 7.16154 7.16082Z"
            stroke="#151515"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="logo-text">CANOVA</p>
      </div>

      <div style={{backgroundColor: "#ebceb0ff", borderTopLeftRadius: "16px", borderTopRightRadius: "16px"}}>
        <div className="form-preview-header">
          <div className="form-preview-title">Title</div>
        </div>
        <div className="form-preview-content" style={{ padding: "0px" }}>
          <section className="form-editor-section">
            <div
              id="form-question-container"
              className="form-question-container"
              style={{ backgroundColor: "#ebceb0ff" }}
            >
              <section
                className="question-section"
                style={{ backgroundColor: "#4dd08eff" }}
              >
                <FormQuestionCard
                  question_no={"1"}
                  question_text={"What is your name?"}
                  question_type={"short answer"}
                />
                <FormQuestionCard
                  question_no={"2"}
                  question_text={"What is your age?"}
                  question_type={"date"}
                />
                <FormQuestionCard
                  question_no={"3"}
                  question_text={"What is your favorite color?"}
                  question_type={"multiple choice"}
                />
                <FormQuestionCard
                  question_no={"4"}
                  question_text={"What is your favorite hobby?"}
                  question_type={"long answer"}
                />
              </section>

              <section
                className="question-section"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                <FormQuestionCard
                  question_no={"1"}
                  question_text={"What is your favorite food?"}
                  question_type={"multiple choice"}
                />
                <FormQuestionCard
                  question_no={"2"}
                  question_text={"How much do you like it?"}
                  question_type={"rating"}
                />
                <FormQuestionCard
                  question_no={"3"}
                  question_text={"Choose the price range?"}
                  question_type={"linear scale"}
                />
              </section>

              {/* {toggleImageUpload && (
              <div className="create-form-image-upload-container">
                <div className="create-form-image-upload-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                    onClick={() => setToggleImageUpload(false)}
                  >
                    <path
                      d="M22.3606 2.37109L1.90161 23.4648M1.90161 2.37109L22.3606 23.4648"
                      stroke="#212121"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Upload Image</p>
                </div>
                <div className="create-form-image-upload-body">
                  <h3>Drop & drag Image to upload</h3>
                  <p>Consider upto 25 MB per Image</p>
                  <p>OR</p>
                  <input
                    className="create-form-image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAddQuestionImage}
                  />
                </div>
              </div>
            )} */}

              {/* {toggleVideoUpload && (
              <div className="create-form-image-upload-container">
                <div className="create-form-image-upload-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ cursor: "pointer" }}
                    onClick={() => setToggleVideoUpload(false)}
                  >
                    <path
                      d="M22.3606 2.37109L1.90161 23.4648M1.90161 2.37109L22.3606 23.4648"
                      stroke="#212121"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Upload Video</p>
                </div>
                <div className="create-form-image-upload-body">
                  <h3>Drop & drag Video to upload</h3>
                  <p>Consider upto 200 MB per Video</p>
                  <p>OR</p>
                  <input
                    className="create-form-video-upload-input"
                    type="file"
                    accept="video/*"
                    onChange={handleAddQuestionVideo}
                  />
                </div>
              </div>
            )} */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FormPreviewPage;
