import { QuizBoard } from "../components/Board/QuizBoard";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { CreateQuestionModal } from "../components/CreateQuestionModal/CreateQuestionModal";
import { CreateQuizModal } from "../components/CreateQuizModal/CreateQuizModal";
import { EditingQuizModal } from "../components/EditingQuizModal/EditingQuizModal";
import { useAppSelector } from "../app/reduxHooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const BoardPage = () => {
  const editingQuiz = useAppSelector((state) => state.quizes.editingQuiz);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("term");
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

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
