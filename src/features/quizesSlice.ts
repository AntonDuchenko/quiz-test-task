import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../types/Quiz";
import { getQuizes } from "../api/quizes";

interface InitialQuizes {
  quizes: Quiz[];
  editingQuiz: Quiz | null;
  loading: boolean;
  error: string;
}

const initialState: InitialQuizes = {
  quizes: [],
  editingQuiz: null,
  loading: true,
  error: "",
};

const QuizesSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    setQuizes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizes = action.payload;

      localStorage.setItem("quizes", JSON.stringify(state.quizes));
    },
    setEditingQuez: (state, action: PayloadAction<Quiz>) => {
      state.editingQuiz = action.payload;
    },
    removeEditingQuez: (state) => {
      state.editingQuiz = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.quizes = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default QuizesSlice.reducer;
export const { setQuizes, setEditingQuez, removeEditingQuez } =
  QuizesSlice.actions;

export const init = createAsyncThunk(
  "quizes/fetch",
  async () => await getQuizes()
);
