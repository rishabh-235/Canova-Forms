import { createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "bson";
const initialState = {
  currentForm: null,
  isInitialized: false,
  isConditionActive: false,
  responseForm: null,
};
const formStateSlice = createSlice({
  name: "formState",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.currentForm = action.payload;
      state.isInitialized = true;
    },
    resetFormState: () => initialState,
    addPage: (state) => {
      if (state.currentForm) {
        const newPage = {
          pageNumber: state.currentForm.pages.length + 1,
          falsePage: state.currentForm.pages.length + 2,
          sections: [
            {
              questions: [
                {
                  questionId: new ObjectId().toString(),
                  questionText: "New Question",
                  type: "short answer",
                  options: [],
                },
              ],
              backgroundColor: "#ffffff",
            },
          ],
        };
        state.currentForm.pages.push(newPage);
      }
    },
    addSection: (state, action) => {
      const { pageNumber } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage?.sections) {
        currentPage.sections.push({
          questions: [
            {
              questionId: new ObjectId().toString(),
              questionText: "New Question",
              type: "short answer",
              options: [],
            },
          ],
          backgroundColor: "#ffffff",
        });
      } else {
        currentPage.sections = [
          {
            questions: [
              {
                questionId: new ObjectId().toString(),
                questionText: "New Question",
                type: "short answer",
                options: [],
              },
            ],
            backgroundColor: "#ffffff",
          },
        ];
      }
    },
    addQuestion: (state, action) => {
      const { pageNumber } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage?.sections[currentPage.sections.length - 1].questions) {
        const currentSection =
          currentPage.sections[currentPage.sections.length - 1];
        currentSection.questions.push({
          questionId: new ObjectId().toString(),
          questionText: "New Question",
          type: "short answer",
          options: [],
        });
      }
    },
    removeQuestion: (state, action) => {
      const { pageNumber, sectionIndex, questionIndex } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      const currentSection = currentPage?.sections[sectionIndex];
      currentSection?.questions.splice(questionIndex, 1);
    },
    removeQuestionById: (state, action) => {
      const { pageNumber, questionId } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const questionIndex = section.questions.findIndex(
            (question) =>
              question.questionId === questionId ||
              question._id?.toString() === questionId
          );
          if (questionIndex !== -1) {
            section.questions.splice(questionIndex, 1);
          }
        });
      }
    },
    changeQuestionType: (state, action) => {
      const { pageNumber, sectionIndex, questionIndex, questionType } =
        action.payload;
      const currentSection = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      )?.sections[sectionIndex];
      const currentQuestion = currentSection?.questions[questionIndex];
      currentQuestion.type = questionType;
    },
    changeQuestionTypeById: (state, action) => {
      const { pageNumber, questionId, questionType } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const question = section.questions.find(
            (q) =>
              q.questionId === questionId || q._id?.toString() === questionId
          );
          if (question) {
            question.type = questionType;
          }
        });
      }
    },
    changeQuestionText: (state, action) => {
      const { pageNumber, sectionIndex, questionIndex, questionText } =
        action.payload;
      const currentPage = state.currentForm?.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      const currentSection = currentPage?.sections[sectionIndex];
      const currentQuestion = currentSection?.questions[questionIndex];
      currentQuestion.questionText = questionText;
    },
    changeQuestionTextById: (state, action) => {
      const { pageNumber, questionId, questionText } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const question = section.questions.find(
            (q) =>
              q.questionId === questionId || q._id?.toString() === questionId
          );
          if (question) {
            question.questionText = questionText;
          }
        });
      }
    },
    changeSectionColor: (state, action) => {
      const { pageNumber, sectionIndex, color } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      const currentSection = currentPage?.sections[sectionIndex];
      currentSection.backgroundColor = color;
    },
    changeFormColor: (state, action) => {
      const { color } = action.payload;
      if (state.currentForm) {
        state.currentForm.backgroundColor = color;
      }
    },
    addImage: (state, action) => {
      const { image } = action.payload;
      const currentPage = state.currentForm.pages[state.activePage - 1];
      const currentSection =
        currentPage.sections[currentPage.sections.length - 1];
      const currentQuestion =
        currentSection.questions[currentSection.questions.length - 1];
      currentQuestion.image = image;
    },
    addVideo: (state, action) => {
      const { video } = action.payload;
      const currentPage = state.currentForm.pages[state.activePage - 1];
      const currentSection =
        currentPage.sections[currentPage.sections.length - 1];
      const currentQuestion =
        currentSection.questions[currentSection.questions.length - 1];
      currentQuestion.video = video;
    },
    addOption: (state, action) => {
      const { pageNumber, questionId } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const question = section.questions.find(
            (q) =>
              q.questionId === questionId || q._id?.toString() === questionId
          );
          if (question) {
            if (!question.options) {
              question.options = [];
            }
            question.options.push({
              optionId: new ObjectId().toString(),
              text: "",
            });
          }
        });
      }
    },
    removeOption: (state, action) => {
      const { pageNumber, questionId, optionId } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const question = section.questions.find(
            (q) =>
              q.questionId === questionId || q._id?.toString() === questionId
          );
          if (question && question.options) {
            const optionIndex = question.options.findIndex(
              (option) =>
                option.optionId === optionId ||
                option._id?.toString() === optionId
            );
            if (optionIndex !== -1) {
              question.options.splice(optionIndex, 1);
            }
          }
        });
      }
    },
    updateOption: (state, action) => {
      const { pageNumber, questionId, optionId, text } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        currentPage.sections.forEach((section) => {
          const question = section.questions.find(
            (q) =>
              q.questionId === questionId || q._id?.toString() === questionId
          );
          if (question && question.options) {
            const option = question.options.find(
              (opt) =>
                opt.optionId === optionId || opt._id?.toString() === optionId
            );
            if (option) {
              option.text = text;
            }
          }
        });
      }
    },
    activateCondition: (state) => {
      state.isConditionActive = !state.isConditionActive;
    },
    addCondition: (state, action) => {
      const { pageNumber, questionId, conditionText } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage) {
        if (!currentPage.conditions) {
          currentPage.conditions = [];
        }
        let existingCondition = currentPage.conditions.find(
          (condition) => condition.questionId === questionId
        );
        if (existingCondition) {
          if (!existingCondition.conditionText.includes(conditionText)) {
            existingCondition.conditionText.push(conditionText);
          }
        } else {
          currentPage.conditions.push({
            questionId,
            conditionText: [conditionText],
          });
        }
      }
    },
    removeCondition: (state, action) => {
      const { pageNumber, questionId, conditionText } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === pageNumber
      );
      if (currentPage && currentPage.conditions) {
        const conditionIndex = currentPage.conditions.findIndex(
          (condition) => condition.questionId === questionId
        );
        if (conditionIndex !== -1) {
          const condition = currentPage.conditions[conditionIndex];
          condition.conditionText = condition.conditionText.filter(
            (text) => text !== conditionText
          );
          if (condition.conditionText.length === 0) {
            currentPage.conditions.splice(conditionIndex, 1);
          }
        }
      }
    },
    addConditionPage: (state, action) => {
      const { pageNo, truePage, falsePage } = action.payload;
      const currentPage = state.currentForm.pages.find(
        (page) => page.pageNumber === parseInt(pageNo)
      );
      if (currentPage) {
        currentPage.truePage = truePage;
        currentPage.falsePage = falsePage;
      }
    },
    addShareEmail: (state, action) => {
      const { email, type, index } = action.payload;
      if (!state.currentForm.sharedWith) {
        state.currentForm.sharedWith = [];
      }
      if (type === "remove") {
        state.currentForm.sharedWith.splice(index, 1);
        return;
      }
      if (state.currentForm.sharedWith[index]) {
        if (email !== undefined) {
          state.currentForm.sharedWith[index].email = email;
        }
        if (type && type !== "remove") {
          state.currentForm.sharedWith[index].type = type;
        }
      } else {
        state.currentForm.sharedWith[index] = {
          email: email || "",
          type: type || "view",
        };
      }
    },
    changeRestriction: (state, action) => {
      const { restriction } = action.payload;
      state.currentForm.restriction = restriction;
    },
    setResponseForm: (state, action) => {
      state.responseForm = action.payload;
    },
  },
});
export const {
  setForm,
  resetFormState,
  addPage,
  addSection,
  addQuestion,
  removeQuestion,
  removeQuestionById,
  changeQuestionType,
  changeQuestionTypeById,
  changeQuestionText,
  changeQuestionTextById,
  changeSectionColor,
  changeFormColor,
  addImage,
  addVideo,
  addOption,
  removeOption,
  updateOption,
  activateCondition,
  addCondition,
  removeCondition,
  addConditionPage,
  addShareEmail,
  changeRestriction,
  setResponseForm,
} = formStateSlice.actions;
export default formStateSlice.reducer;
