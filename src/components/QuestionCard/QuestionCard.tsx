import { Question } from "../../types/Question";

interface Props {
  question: Question;
}

export const QuestionCard: React.FC<Props> = ({ question }) => {
  const { title, options, answer } = question;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg">{title}</div>

      <ul className="flex flex-col gap-2">
        {options.map((option) => (
          <li key={option} className="bg-slate-200 rounded-lg hover:bg-slate-300 transition-all">
            <button
              className="w-full text-start px-4 py-2"
              onClick={() => {
                if (option === answer) {
                  console.log("correct");
                } else {
                  console.log("wrong");
                }
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
