import { QuizBoard } from '../components/Board/QuizBoard'
import { BoardHeader } from '../components/BoardHeader/BoardHeader'
import { CreateQuestionModal } from '../components/CreateQuestionModal/CreateQuestionModal'
import { CreateQuizModal } from '../components/CreateQuizModal/CreateQuizModal'

export const BoardPage = () => {
  return <div>
    <BoardHeader />
    <QuizBoard />

    <CreateQuizModal />
    <CreateQuestionModal />
  </div>
}