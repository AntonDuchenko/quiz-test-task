import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard/QuestionCard";
import arrowIcon from "../assets/right-arrow.svg";
import { useAppSelector } from '../app/reduxHooks';

export const QuizPage = () => {
  const { quizId, questionId } = useParams();
  const quizes = useAppSelector(state => state.quizes.quizes);
  const navigate = useNavigate();

  const choosedQuiz = quizes.find((quiz) => quiz.id === quizId!);
  const { title, questions } = choosedQuiz!;

  const question = questions.find((q) => q.id === questionId!);
  const currentIndex = questions.findIndex((q) => q.id === questionId!) + 1;

  const questionIdActive = () => {
    const question = questions[currentIndex];

    return question.id;
  };

  const isFinished = currentIndex === questions.length;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold py-2">{title}</h2>
      <p className="text-xl font-semibold">{`Question ${currentIndex} of ${questions.length}:`}</p>

      <QuestionCard question={question!} key={question?.id} />

      <button
        onClick={() => {
          if (!isFinished) {
            navigate(`./${questionIdActive()}`);
          } else {
            navigate("/finish")
          }
        }}
        type="button"
        className="bg-green-600 flex justify-center items-center rounded-lg max-w-[150px] h-9 text-white"
      >
        {isFinished ? (
          "Finish quiz"
        ) : (
          <>
            <span>Next</span>
            <img src={arrowIcon} alt="arrow right icon" className="w-6" />
          </>
        )}
      </button>
    </div>
  );
};
