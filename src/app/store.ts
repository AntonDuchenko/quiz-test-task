import { configureStore } from '@reduxjs/toolkit'
import quizesSlice from '../features/quizesSlice'
import questionsSlice from '../features/questionsSlice'

export const store = configureStore({
  reducer: {
    quizes: quizesSlice,
    questions: questionsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch