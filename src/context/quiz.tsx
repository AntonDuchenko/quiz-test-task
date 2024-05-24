import { createContext, useEffect, useMemo, useState } from "react";
import { QuizContextType } from "../types/QuizContext";
import { Quiz } from "../types/Quiz";
import { getQuizes } from "../api/quizes";
import { Question } from "../types/Question";

export const QuizContext = createContext<QuizContextType>({
  isCreateQuiz: false,
  setIsCreateQuiz: () => {},
  quizes: [],
  setQuizes: () => {},
  editingQuiz: null,
  setEditingQuiz: () => {},
  isCreateQuestion: false,
  setIsCreateQuestion: () => {},
  questions: [],
  setQuestions: () => {},
  isEditingQuiz: false,
  setIsEditingQuiz: () => {},
  editingQuestion: null,
  setEditingQuestion: () => {},
  score: 0,
  setScore: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<Props> = ({ children }) => {
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [isCreateQuestion, setIsCreateQuestion] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuizes().then(setQuizes);
  }, []);

  const preparedValue = useMemo(
    () => ({
      isCreateQuiz,
      setIsCreateQuiz,
      quizes,
      setQuizes,
      editingQuiz,
      setEditingQuiz,
      isCreateQuestion,
      setIsCreateQuestion,
      questions,
      setQuestions,
      isEditingQuiz,
      setIsEditingQuiz,
      editingQuestion,
      setEditingQuestion,
      score,
      setScore,
    }),
    [
      isCreateQuiz,
      quizes,
      editingQuiz,
      isCreateQuestion,
      questions,
      isEditingQuiz,
      editingQuestion,
      score
    ]
  );

  return (
    <QuizContext.Provider value={preparedValue}>
      {children}
    </QuizContext.Provider>
  );
};
