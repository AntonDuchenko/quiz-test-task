import { useContext } from "react";
import { QuizBoard } from "../components/Board/QuizBoard";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { CreateQuestionModal } from "../components/CreateQuestionModal/CreateQuestionModal";
import { CreateQuizModal } from "../components/CreateQuizModal/CreateQuizModal";
import { QuizContext } from "../context/quiz";
import { EditingQuizModal } from '../components/EditingQuizModal/EditingQuizModal';

export const BoardPage = () => {
  const { editingQuiz } = useContext(QuizContext);

  return (
    <div>
      <BoardHeader />
      <QuizBoard />

      <CreateQuizModal />
      <CreateQuestionModal />
      {editingQuiz && <EditingQuizModal />}
    </div>
  );
};
