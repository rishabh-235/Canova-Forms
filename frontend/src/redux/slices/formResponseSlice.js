import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  responses: {},
  currentPageIndex: 0,
  isSubmitted: false,
  submissionId: null,
};
const formResponseSlice = createSlice({
  name: "formResponse",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      const { questionId, value } = action.payload;
      state.responses[questionId] = value;
    },
    setMultipleResponses: (state, action) => {
      const responses = action.payload;
      state.responses = { ...state.responses, ...responses };
    },
    clearResponse: (state, action) => {
      const { questionId } = action.payload;
      delete state.responses[questionId];
    },
    nextPage: (state) => {
      state.currentPageIndex += 1;
    },
    previousPage: (state) => {
      if (state.currentPageIndex > 0) {
        state.currentPageIndex -= 1;
      }
    },
    goToPage: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    submitForm: (state, action) => {
      state.isSubmitted = true;
      state.submissionId = action.payload.submissionId;
    },
    resetFormResponse: () => initialState,
  },
});
export const {
  setResponse,
  setMultipleResponses,
  clearResponse,
  nextPage,
  previousPage,
  goToPage,
  submitForm,
  resetFormResponse,
} = formResponseSlice.actions;
export default formResponseSlice.reducer;


