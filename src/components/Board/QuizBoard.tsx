import { useContext } from 'react';
import { QuizCard } from '../QuizCard/QuizCard';
import { QuizContext } from '../../context/quiz';

export const QuizBoard = () => {
  const { quizes } = useContext(QuizContext);

  return (
    <div
      className="flex flex-wrap mt-3 gap-4"
    >
      {quizes.map(quiz => <QuizCard quiz={quiz} key={quiz.id} />)}
    </div>
  );
};
