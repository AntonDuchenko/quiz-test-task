import { useNavigate } from "react-router-dom";
import { Quiz } from "../../types/Quiz";
import { DotsDropDown } from "../DotsDropDown/DotsDropDown";

interface Props {
  quiz: Quiz;
}

export const QuizCard: React.FC<Props> = ({ quiz }) => {
  const { id, title, duration, questions } = quiz;
  const navigation = useNavigate();

  const firstQuestion = questions[0].id;

  return (
    <section className="border-solid border-2 rounded-lg flex flex-col gap-4 p-3 max-w-[200px] w-full hover:scale-[1.1] transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between w-full">
          <button
            onClick={() => navigation(`/quizes/${id}/${firstQuestion}`)}
            className="font-medium text-2xl"
          >
            {title}
          </button>
          <DotsDropDown quiz={quiz} />
        </div>

        <p>{`Duration: ${duration} min`}</p>
        <p>{`Questions: ${questions.length}`}</p>
      </div>
    </section>
  );
};
