import ResponseShortType from "./ResponseQuestionTypeComponents/ResponseShortType";
import ResponseCheckboxType from "./ResponseQuestionTypeComponents/ResponseCheckboxType";
import ResponseLongType from "./ResponseQuestionTypeComponents/ResponseLongType";
import ResponseRatingType from "./ResponseQuestionTypeComponents/ResponseRatingType";
import ResponseLinearScaleType from "./ResponseQuestionTypeComponents/ResponseLinearScaleType";
import ResponseDateType from "./ResponseQuestionTypeComponents/ResponseDateType";
import ResponseRadioType from "./ResponseQuestionTypeComponents/ResponseRadioType";
import ResponseDropdownType from "./ResponseQuestionTypeComponents/ResponseDropdownType";
function ResponseFormQuestionCard({
  question_no,
  question_text,
  question_type,
  questionImage,
  questionVideo,
  options,
  questionId,
  onResponseChange,
  responseValue,
  isRequired = false,
}) {
  return (
    <div className="question-card">
      <div className="question-text">
        <div>
          <span>Q{question_no}.</span>
          <p>
            {question_text}
            {isRequired && <span className="required-asterisk"> *</span>}
          </p>
        </div>
      </div>
      <div className="question-image-video-container">
        {questionImage && (
          <img src={questionImage} alt="Question" className="question-image" />
        )}
        {questionVideo && (
          <video src={questionVideo} controls className="question-video" />
        )}
      </div>
      <div className="question-options-container">
        {question_type === "multiple choice" && (
          <ResponseRadioType
            questionId={questionId}
            options={options}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "short answer" && (
          <ResponseShortType
            questionId={questionId}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "checkbox" && (
          <ResponseCheckboxType
            questionId={questionId}
            options={options}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "long answer" && (
          <ResponseLongType
            questionId={questionId}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "rating" && (
          <ResponseRatingType
            questionId={questionId}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "linear scale" && (
          <ResponseLinearScaleType
            questionId={questionId}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "date" && (
          <ResponseDateType
            questionId={questionId}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
        {question_type === "dropdown" && (
          <ResponseDropdownType
            questionId={questionId}
            options={options}
            onResponseChange={onResponseChange}
            value={responseValue}
          />
        )}
      </div>
    </div>
  );
}
export default ResponseFormQuestionCard;



