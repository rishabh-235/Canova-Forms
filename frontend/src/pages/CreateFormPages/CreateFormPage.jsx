import React, { useState } from "react";
import "../style/createfrompagestyle.css";
import FormEditor from "../../components/FormEditor";
import QuestionCard from "../../components/QuestionCard";
import { Link } from "react-router-dom";

function CreateFormPage() {
  const [sections, setSections] = useState([]);
  const [focusQuestionInput, setFocusQuestionInput] = useState(false);
  const [formBackgroundColor, setFormBackgroundColor] = useState("#ffffff");
  const [sectionColor, setSectionColor] = useState("#c9def3");
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [toggleVideoUpload, setToggleVideoUpload] = useState(false);

  const handleAddQuestion = () => {
    if (sections.length === 0) {
      setSections([
        {
          SectionColor: "#c9def3",
          questions: [
            {
              question_no: 1,
              question_type: "short answer",
              question_text: "",
              image: null,
              video: null,
            },
          ],
        },
      ]);
    } else {
      sections[sections.length - 1].questions?.push({
        question_no: sections[sections.length - 1].questions?.length + 1,
        question_type: "short answer",
        question_text: "",
        image: null,
        video: null,
      });
      setSections([...sections]);
    }
  };

  const handleFocusQuestionInput = () => {
    setFocusQuestionInput(true);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        SectionColor: sectionColor,
        questions: [
          {
            question_no: 1,
            question_type: "short answer",
            question_text: "",
            image: null,
            video: null,
          },
        ],
      },
    ]);
  };

  const handleBackgroundColorChange = (e) => {
    setFormBackgroundColor(e.target.value);
  };

  const handleSectionColorChange = (e) => {
    setSectionColor(e.target.value);
    sections[sections.length - 1].SectionColor = e.target.value;
    setSections([...sections]);
  };

  const handleChangeQuestionType = (
    question_type,
    question_index,
    section_index
  ) => {
    const updatedSections = [...sections];
    updatedSections[section_index].questions[question_index].question_type =
      question_type;
    setSections(updatedSections);
  };

  const handleChangeQuestionText = (text, question_index, section_index) => {
    const updatedSections = [...sections];
    updatedSections[section_index].questions[question_index].question_text =
      text;
    setSections(updatedSections);
  };

  const handleAddQuestionImage = (e) => {
    const updatedSections = [...sections];
    const lastSection = updatedSections[updatedSections.length - 1];
    if (
      lastSection &&
      lastSection.questions &&
      lastSection.questions.length > 0
    ) {
      const currentQuestion =
        lastSection.questions[lastSection.questions.length - 1];
      currentQuestion.image = e.target.files[0];
      setSections(updatedSections);
      setToggleImageUpload(false);
    } else {
      console.warn("No question available to add image.");
    }
  };

  const handleAddQuestionVideo = (e) => {
    const updatedSections = [...sections];
    const lastSection = updatedSections[updatedSections.length - 1];
    if (
      lastSection &&
      lastSection.questions &&
      lastSection.questions.length > 0
    ) {
      const currentQuestion =
        lastSection.questions[lastSection.questions.length - 1];
      currentQuestion.video = e.target.files[0];
      setSections(updatedSections);
      setToggleVideoUpload(false);
    } else {
      console.warn("No question available to add video.");
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-title">Title</div>
      <div className="create-from-action-buttons">
        <Link to="/preview" className="form-preview-button">Preview</Link>
        <button className="form-save-button">Save</button>
      </div>
      <div className="homepage-content" style={{ padding: "0px" }}>
        <section className="form-editor-section">
          <div
            id="form-question-container"
            className="form-question-container"
            style={{ backgroundColor: formBackgroundColor }}
          >
            {sections.map((item, sindex) => {
              return (
                <section
                  className="question-section"
                  style={{ backgroundColor: item.SectionColor }}
                  key={sindex}
                >
                  {item?.questions?.map((question, qIndex) => (
                    <QuestionCard
                      key={qIndex}
                      question_index={qIndex}
                      section_index={sindex}
                      question_no={qIndex + 1}
                      question_text={question.question_text}
                      question_type={question.question_type}
                      focusQuestionInput={focusQuestionInput}
                      handleChangeQuestionType={handleChangeQuestionType}
                      handleChangeQuestionText={handleChangeQuestionText}
                      questionImage={question.image}
                      questionVideo={question.video}
                    />
                  ))}
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
            handleAddQuestion={handleAddQuestion}
            handleFocusQuestionInput={handleFocusQuestionInput}
            handleAddSection={handleAddSection}
            handleBackgroundColorChange={handleBackgroundColorChange}
            handleSectionColorChange={handleSectionColorChange}
            sectionColor={sectionColor}
            backgroundColor={formBackgroundColor}
            setToggleImageUpload={setToggleImageUpload}
            setToggleVideoUpload={setToggleVideoUpload}
          />
        </section>
      </div>
    </div>
  );
}

export default CreateFormPage;
