import { Question } from './Question';
import { Quiz } from './Quiz';

export type QuizContextType = {
  isCreateQuiz: boolean;
  setIsCreateQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  quizes: Quiz[];
  setQuizes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  editingQuiz: Quiz | null;
  setEditingQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
  isCreateQuestion: boolean;
  setIsCreateQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
};
