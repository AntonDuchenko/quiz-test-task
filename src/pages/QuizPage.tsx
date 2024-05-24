import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard/QuestionCard";
import arrowIcon from "../assets/right-arrow.svg";
import { useAppSelector } from "../app/reduxHooks";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quiz";
import { formatTime } from "../utils/formatTimer";
import classNames from "classnames";

export const QuizPage = () => {
  const { quizId, questionId } = useParams();
  const { seconds, setSeconds } = useContext(QuizContext);
  const quizes = useAppSelector((state) => state.quizes.quizes);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((currSeconds) => currSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [setSeconds]);

  const [isChoosed, setIsChoosed] = useState(false);

  const choosedQuiz = quizes.find((quiz) => quiz.id === quizId!);
  const { title, questions } = choosedQuiz!;

  const question = questions.find((q) => q.id === questionId!);
  const currentIndex = questions.findIndex((q) => q.id === questionId!) + 1;

  const questionIdActive = () => {
    const question = questions[currentIndex];

    return question.id;
  };

  const handleOnClick = () => {
    if (!isFinished) {
      navigate(`./${questionIdActive()}`);
    } else {
      navigate("/finish");
    }
  };

  const isFinished = currentIndex === questions.length;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold py-2">{title}</h2>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">{`Question ${currentIndex} of ${questions.length}:`}</p>
        <p>{formatTime(seconds)}</p>
      </div>

      <QuestionCard
        key={question?.id}
        question={question!}
        setIsChoosed={setIsChoosed}
      />

      <button
        onClick={handleOnClick}
        disabled={!isChoosed}
        type="button"
        className={classNames(
          "bg-green-600 flex justify-center items-center rounded-lg max-w-[150px] h-9 text-white",
          { "!bg-gray-500": !isChoosed }
        )}
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
