import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { formatTime } from "../utils/formatTimer";

export const QuizResultPage = () => {
  const { score, setScore, seconds, setSeconds } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
    });

    return () => setSeconds(0);
  }, [setSeconds]);

  const handleOnBackClick = () => {
    navigate("/quizes");
    setScore(0);
  };

  return (
    <div className="flex items-center justify-center h-svh flex-col gap-10">
      <p className="text-7xl text-center font-extrabold max-w-[80%]">
        {`Congratz! You finished this quiz in ${formatTime(
          seconds
        )}. Your score: ${score}`}
      </p>
      <button
        onClick={handleOnBackClick}
        className="h-[50px] max-w-[100px] sm:min-w-[180px] w-full border flex flex-row gap-2 justify-center items-center
        border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
      >
        Back to quizes
      </button>
    </div>
  );
};
