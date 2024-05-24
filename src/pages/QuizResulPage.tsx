import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/quiz";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { formatTime } from "../utils/formatTimer";
import { TEInput } from "tw-elements-react";
import { User } from "../types/User";
import { v4 as uuidv4 } from "uuid";

export const QuizResultPage = () => {
  const { score, setScore, seconds, setSeconds } = useContext(QuizContext);
  const navigate = useNavigate();
  const boardFromStorage = () => {
    const board = localStorage.getItem("leaderboard");

    if (board) {
      return JSON.parse(board);
    }
  };

  const [userName, setUserName] = useState("");
  const [leaderBoard, setLeaderBoard] = useState<User[]>(
    boardFromStorage() || []
  );
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);

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

  const handleOnChangeNicknameValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setUserName(e.target.value);

  const handleOnEnterToLeaderBoard = () => {
    const newLeaderboard = [
      ...leaderBoard,
      {
        id: uuidv4(),
        nickname: userName,
        score,
      },
    ];

    setLeaderBoard(newLeaderboard);
    localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
    setIsShowLeaderboard(true);
  };

  return (
    <div className="flex items-center justify-center h-svh flex-col gap-10">
      <p className="text-7xl text-center font-extrabold max-w-[80%]">
        {`Congratz! You finished this quiz in ${formatTime(
          seconds
        )}. Your score: ${score}`}
      </p>

      {isShowLeaderboard ? (
        <div className="max-h-[300px] h-full max-w-[300px] w-full mb-3">
          <span className="text-center block mb-3 text-2xl font-bold">
            Leaderboard
          </span>
          <ul className="border-solid border-2 rounded-md h-full p-4 flex flex-col gap-2">
            {leaderBoard.sort((a, b) => b.score - a.score).map((leader) => (
              <li className="flex justify-between items-center border-b-2 border-red-500">
                <span>{leader.nickname}</span>
                <span>{leader.score}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <TEInput
          onChange={handleOnChangeNicknameValue}
          type="text"
          id="exampleFormControlInputText"
          label="Nickname"
          value={userName}
        />
      )}

      <div className="flex gap-3">
        <button
          disabled={isShowLeaderboard}
          onClick={handleOnEnterToLeaderBoard}
          className="h-[50px] max-w-[100px] sm:min-w-[180px] w-full border flex flex-row gap-2 justify-center items-center
        border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
        >
          Enter the leaderboard
        </button>

        <button
          onClick={handleOnBackClick}
          className="h-[50px] max-w-[100px] sm:min-w-[180px] w-full border flex flex-row gap-2 justify-center items-center
        border-solid rounded-lg bg-slate-600 text-white hover:bg-slate-800 transition-all"
        >
          Back to quizes
        </button>
      </div>
    </div>
  );
};
