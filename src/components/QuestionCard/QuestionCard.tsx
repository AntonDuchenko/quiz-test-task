import { useContext, useEffect, useState } from "react";
import { Question } from "../../types/Question";
import classNames from "classnames";
import { QuizContext } from "../../context/quiz";

interface Props {
  question: Question;
  setIsChoosed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QuestionCard: React.FC<Props> = ({ question, setIsChoosed }) => {
  const { title, options, answer, points } = question;
  const { setScore } = useContext(QuizContext);
  const [choosedAnswer, setChoosedAnswer] = useState<string | null>(null);

  useEffect(() => setIsChoosed(false), [setIsChoosed]);

  const handleOptionClick = (option: string) => {
    if (!choosedAnswer) {
      setChoosedAnswer(option);

      if (option === answer) {
        setScore((currentScore) => currentScore + points);
      }
    }

    setIsChoosed(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg">{title}</div>

      <ul className="flex flex-col gap-2">
        {options.map((option) => {
          const isCorrect = option === answer;
          const isChoosed = choosedAnswer === option;

          return (
            <li
              key={option}
              className={classNames(
                "bg-slate-200 rounded-lg hover:bg-slate-300 transition-all",
                {
                  "!bg-green-700": isChoosed && isCorrect,
                  "!bg-red-600": isChoosed && !isCorrect,
                }
              )}
            >
              <button
                disabled={!!choosedAnswer}
                className="w-full text-start px-4 py-2"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
