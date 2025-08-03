import { useEffect, useState } from "react";
import "./style/questioncardstyle.css";
import RadioType from "./QuestionTypeComponents/RadioType";
import "./style/questiontypecomponentstyle.css";
import ShortType from "./QuestionTypeComponents/ShortType";
import LongType from "./QuestionTypeComponents/LongType";
import CheckboxType from "./QuestionTypeComponents/CheckboxType";
import RatingType from "./QuestionTypeComponents/RatingType";
import LinearScaleType from "./QuestionTypeComponents/LinearScaleType";
import DateType from "./QuestionTypeComponents/DateType";
import {
  changeQuestionType,
  changeQuestionText,
  removeQuestion,
} from "../redux/slices/state/formstateslice";
import { useDispatch } from "react-redux";
import DropdownType from "./QuestionTypeComponents/DropdownType";
import { useParams } from "react-router-dom";
function QuestionCard({
  question_index,
  section_index,
  question_no,
  focusQuestionInput,
  question,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const { pageNo } = useParams();
  const question_text = question.questionText;
  const question_type = question.type;
  const questionImage = question.image;
  const questionVideo = question.video;
  const options = question.options;
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".question-card")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [questionImage, questionVideo]);
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && question_text === "") {
      e.preventDefault();
      dispatch(
        removeQuestion({
          pageNumber: pageNo,
          sectionIndex: section_index,
          questionIndex: question_index,
        })
      );
    }
  };
  return (
    <div className="question-card">
      <div className="question-text">
        <div>
          <span>Q{question_no}.</span>
          {focusQuestionInput !== true ? (
            <p>{question_text}</p>
          ) : (
            <input
              type="text"
              placeholder="Enter your question here..."
              value={question_text}
              autoFocus
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                dispatch(
                  changeQuestionText({
                    pageNumber: parseInt(pageNo),
                    questionText: e.target.value,
                    questionIndex: question_index,
                    sectionIndex: section_index,
                  })
                );
              }}
            />
          )}
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="question-type-button"
          id="question-type-button"
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 32 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7138 7.74658C24.9873 7.43549 25.4727 7.39119 25.7978 7.64794C26.1228 7.90469 26.164 8.36518 25.8905 8.67626L16.6327 19.2056C16.5939 19.2594 16.5504 19.3122 16.495 19.356C16.3733 19.452 16.2291 19.5055 16.0819 19.519H15.9179C15.7708 19.5055 15.6265 19.452 15.5048 19.356C15.4474 19.3107 15.4017 19.2567 15.3622 19.2007L6.10928 8.67626C5.83583 8.36522 5.87714 7.90471 6.20205 7.64794C6.52709 7.3912 7.01254 7.4355 7.28604 7.74658L15.9999 17.6577L24.7138 7.74658Z"
              fill="black"
            />
          </svg>
          <p>
            {question_type?.charAt(0).toUpperCase() + question_type?.slice(1)}
          </p>
        </button>
        {showOptions && (
          <ul
            onClick={(e) => {
              dispatch(
                changeQuestionType({
                  pageNumber: parseInt(pageNo),
                  questionType: e.target.innerText.toLowerCase(),
                  questionIndex: question_index,
                  sectionIndex: section_index,
                })
              );
              setShowOptions(false);
            }}
            className="question-type-options"
          >
            <li>Multiple Choice</li>
            <li>Short Answer</li>
            <li>Long Answer</li>
            <li>Checkbox</li>
            <li>Dropdown</li>
            <li>File Upload</li>
            <li>Date</li>
            <li>Linear Scale</li>
            <li>Rating</li>
          </ul>
        )}
      </div>
      <div className="question-image-video-container">
        {questionImage && (
          <img
            src={URL.createObjectURL(questionImage)}
            alt="Question"
            className="question-image"
          />
        )}
        {questionVideo && (
          <video src={URL.createObjectURL(questionVideo)} controls />
        )}
      </div>
      <div className="question-options-container">
        {question_type === "multiple choice" && (
          <RadioType
            question_no={question_no}
            sectionIndex={section_index}
            options={options}
            questionId={question.questionId || question._id?.toString()}
          />
        )}
        {question_type === "short answer" && <ShortType />}
        {question_type === "checkbox" && (
          <CheckboxType
            sectionIndex={section_index}
            question_no={question_no}
            options={options}
            questionId={question.questionId || question._id?.toString()}
          />
        )}
        {question_type === "long answer" && <LongType />}
        {question_type === "rating" && (
          <RatingType
            questionId={question.questionId || question._id?.toString()}
          />
        )}
        {question_type === "linear scale" && (
          <LinearScaleType
            questionId={question.questionId || question._id?.toString()}
          />
        )}
        {question_type === "date" && (
          <DateType
            questionId={question.questionId || question._id?.toString()}
          />
        )}
        {question_type === "dropdown" && (
          <DropdownType
            sectionIndex={section_index}
            question_no={question_no}
            options={options}
            questionId={question.questionId || question._id?.toString()}
          />
        )}
      </div>
    </div>
  );
}
export default QuestionCard;



