import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export const QuizResultPage = () => {
  const { score, setScore } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-svh flex-col gap-10">
      <p className="text-7xl font-extrabold">
        {`Congratz! You finished this quiz. Your score: ${score}`}
      </p>
      <button
        onClick={() => {
          navigate("/quizes");
          setScore(0);
        }}
        className="h-[50px] max-w-[100px] sm:min-w-[180px] w-full border flex flex-row gap-2 justify-center items-center
        border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
      >
        Back to quizes
      </button>
    </div>
  );
};