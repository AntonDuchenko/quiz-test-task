export type QuizContextType = {
  isCreateQuiz: boolean;
  setIsCreateQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateQuestion: boolean;
  setIsCreateQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditingQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingQuiz: boolean;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
};
