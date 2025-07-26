import ShortType from "./QuestionTypeComponents/ShortType";
import CheckboxType from "./QuestionTypeComponents/CheckboxType";
import LongType from "./QuestionTypeComponents/LongType";
import RatingType from "./QuestionTypeComponents/RatingType";
import LinearScaleType from "./QuestionTypeComponents/LinearScaleType";
import DateType from "./QuestionTypeComponents/DateType";
import RadioType from "./QuestionTypeComponents/RadioType";

function FormQuestionCard({
  question_no,
  question_text,
  question_type,
  questionImage,
  questionVideo,
}) {
  return (
    <div className="question-card">
      <div className="question-text">
        <div>
          <span>Q{question_no}.</span>
          <p>{question_text}</p>
        </div>
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
          <RadioType question_no={question_no} />
        )}
        {question_type === "short answer" && <ShortType />}
        {question_type === "checkbox" && <CheckboxType />}
        {question_type === "long answer" && <LongType />}
        {question_type === "rating" && <RatingType />}
        {question_type === "linear scale" && <LinearScaleType />}
        {question_type === "date" && <DateType />}
      </div>
    </div>
  );
}

export default FormQuestionCard;
