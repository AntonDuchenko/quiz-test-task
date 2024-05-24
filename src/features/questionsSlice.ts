import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "../types/Question";

interface initialQuestions {
  questions: Question[];
  editingQuestion: Question | null;
}

const initialState: initialQuestions = {
  questions: [],
  editingQuestion: null,
};

const QuestionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    resetQuestions: (state) => {
      state.questions = [];
    },
    setEditingQuestion: (state, action: PayloadAction<Question>) => {
      state.editingQuestion = action.payload;
    },
    removeEditingQuestion: (state) => {
      state.editingQuestion = null;
    },
  },
});

export default QuestionsSlice.reducer;
export const {
  setQuestions,
  resetQuestions,
  setEditingQuestion,
  removeEditingQuestion,
} = QuestionsSlice.actions;
