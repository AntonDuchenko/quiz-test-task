import { QuizBoard } from "../components/Board/QuizBoard";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { CreateQuestionModal } from "../components/CreateQuestionModal/CreateQuestionModal";
import { CreateQuizModal } from "../components/CreateQuizModal/CreateQuizModal";
import { EditingQuizModal } from '../components/EditingQuizModal/EditingQuizModal';
import { useAppSelector } from '../app/reduxHooks';

export const BoardPage = () => {
  const editingQuiz = useAppSelector(state => state.quizes.editingQuiz);

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
