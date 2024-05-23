import { useContext } from "react";
import plusIcon from "../../assets/plus.svg";
import { QuizContext } from "../../context/quiz";

export const BoardHeader = () => {
  const { setIsCreateQuiz } = useContext(QuizContext);

  return (
    <div className="h-[60px] flex justify-between py-[10px] border-b-black border-b">
      <h1 className="capitalize text-2xl sm:text-4xl font-bold">
        Select a quiz
      </h1>

      <div className="flex gap-2">
        <button
          onClick={() => setIsCreateQuiz(true)}
          type="button"
          className="max-h-[40px] min-w-[50px] sm:min-w-[180px] w-full border flex flex-row gap-2 justify-center items-center
        border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
        >
          <img src={plusIcon} alt="create-icon" className="h-[18px]" />

          <span className="hidden sm:block">Create new quiz</span>
        </button>
      </div>
    </div>
  );
};