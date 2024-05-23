import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard/QuestionCard";
import arrowIcon from "../assets/right-arrow.svg";

export const QuizPage = () => {
  const { quizId, questionId } = useParams();
  const { quizes } = useContext(QuizContext);
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
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-xl font-semibold">{`Question ${currentIndex} of ${questions.length}:`}</p>

      <QuestionCard question={question!} key={question?.id} />
      <button
        onClick={() => {
          if (!isFinished) {
            navigate(`./${questionIdActive()}`);
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
