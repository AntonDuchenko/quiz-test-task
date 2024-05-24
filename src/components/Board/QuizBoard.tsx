import { QuizCard } from '../QuizCard/QuizCard';
import { useAppSelector } from '../../app/reduxHooks';

export const QuizBoard = () => {
  const quizes = useAppSelector(state => state.quizes.quizes);

  return (
    <div
      className="flex flex-wrap mt-3 gap-4"
    >
      {quizes.map(quiz => <QuizCard quiz={quiz} key={quiz.id} />)}
    </div>
  );
};
