import { useState } from "react";
import "../style/createfrompagestyle.css";
import FormEditor from "../../components/FormEditor";
import QuestionCard from "../../components/QuestionCard";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addImage, addVideo } from "../../redux/slices/state/formstateslice";
import { useSaveFormMutation } from "../../redux/slices/api/form.api";
import ConditionCard from "../../components/ConditionCard";
import { toast } from "react-toastify";
function CreateFormPage() {
  const { currentForm, isConditionActive } = useSelector((state) => state.form);
  const [focusQuestionInput, setFocusQuestionInput] = useState(false);
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [toggleVideoUpload, setToggleVideoUpload] = useState(false);
  const { pageNo } = useParams();
  const currentPage = currentForm?.pages?.find(
    (page) => page.pageNumber === parseInt(pageNo)
  );
  const sections = currentPage?.sections || [];
  const dispatch = useDispatch();
  const [saveForm] = useSaveFormMutation();
  const [toggleConditionCard, setToggleConditionCard] = useState(false);
  const handleFocusQuestionInput = () => {
    setFocusQuestionInput(true);
  };
  const handleAddQuestionImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    dispatch(addImage({ image: file }));
    setToggleImageUpload(false);
    toast.success("Image added successfully!");
  };
  const handleAddQuestionVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Video size should be less than 10MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    dispatch(addVideo({ video: file }));
    setToggleVideoUpload(false);
    toast.success("Video added successfully!");
  };
  const handleSaveForm = async () => {
    if (!currentForm?.pages || currentForm.pages.length === 0) {
      toast.error("Cannot save an empty form. Please add some content first.");
      return;
    }

    const loadingToast = toast.loading("Saving form...");

    try {
      const response = await saveForm(currentForm).unwrap();
      toast.update(loadingToast, {
        render: "Form saved successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to save form. Please try again.";
      toast.update(loadingToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="homepage-container">
      <div className="homepage-title">{currentForm?.formTitle}</div>
      <div className="create-from-action-buttons">
        <Link
          to={`/create-form/${currentForm?._id}/preview`}
          className="form-preview-button"
        >
          Preview
        </Link>
        <button onClick={handleSaveForm} className="form-save-button">
          Save
        </button>
      </div>
      <div className="homepage-content" style={{ padding: "0px" }}>
        <section className="form-editor-section">
          <div
            id="form-question-container"
            className="form-question-container"
            style={{
              backgroundColor: currentForm?.backgroundColor || "#ffffff",
            }}
          >
            {sections?.map((section, sindex) => {
              return (
                <section
                  className="question-section"
                  style={{ backgroundColor: section?.backgroundColor }}
                  key={sindex}
                >
                  {section?.questions?.map((question, qIndex) => {
                    const isLastSection = sindex === sections.length - 1;
                    const isLastQuestion =
                      qIndex === section.questions.length - 1;
                    const shouldFocus =
                      focusQuestionInput && isLastSection && isLastQuestion;
                    return (
                      <QuestionCard
                        key={question.questionId || question._id || qIndex}
                        question_index={qIndex}
                        section_index={sindex}
                        question_no={qIndex + 1}
                        question={question}
                        focusQuestionInput={shouldFocus}
                      />
                    );
                  })}
                </section>
              );
            })}
            {toggleImageUpload && (
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
            )}
            {toggleVideoUpload && (
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
            )}
          </div>
          <FormEditor
            formId={currentForm?._id}
            handleFocusQuestionInput={handleFocusQuestionInput}
            setToggleImageUpload={setToggleImageUpload}
            setToggleVideoUpload={setToggleVideoUpload}
          />
          {isConditionActive && (
            <button
              className="create-form-add-condition-button"
              onClick={() => setToggleConditionCard(!toggleConditionCard)}
            >
              Add Condition
            </button>
          )}
          {toggleConditionCard && (
            <ConditionCard setToggleConditionCard={setToggleConditionCard} />
          )}
        </section>
      </div>
    </div>
  );
}
export default CreateFormPage;
