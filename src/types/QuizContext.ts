import { Question } from "./Question";
import { Quiz } from "./Quiz";

export type QuizContextType = {
  isCreateQuiz: boolean;
  setIsCreateQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  quizes: Quiz[];
  setQuizes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  editingQuiz: Quiz | null;
  setEditingQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
  isCreateQuestion: boolean;
  setIsCreateQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setIsEditingQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingQuiz: boolean;
  editingQuestion: Question | null;
  setEditingQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};
