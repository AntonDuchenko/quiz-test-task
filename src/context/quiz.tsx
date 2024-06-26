import { createContext, useMemo, useState } from "react";
import { QuizContextType } from "../types/QuizContext";

export const QuizContext = createContext<QuizContextType>({
  isCreateQuiz: false,
  setIsCreateQuiz: () => {},
  isCreateQuestion: false,
  setIsCreateQuestion: () => {},
  isEditingQuiz: false,
  setIsEditingQuiz: () => {},
  score: 0,
  setScore: () => {},
  seconds: 0,
  setSeconds: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const QuizProvider: React.FC<Props> = ({ children }) => {
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [isCreateQuestion, setIsCreateQuestion] = useState(false);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const preparedValue = useMemo(
    () => ({
      isCreateQuiz,
      setIsCreateQuiz,
      isCreateQuestion,
      setIsCreateQuestion,
      isEditingQuiz,
      setIsEditingQuiz,
      score,
      setScore,
      seconds,
      setSeconds,
    }),
    [isCreateQuiz, isCreateQuestion, isEditingQuiz, score, seconds]
  );

  return (
    <QuizContext.Provider value={preparedValue}>
      {children}
    </QuizContext.Provider>
  );
};
