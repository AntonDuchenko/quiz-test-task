import { QuizCard } from "../QuizCard/QuizCard";
import { useAppSelector } from "../../app/reduxHooks";
import { useSearchParams } from "react-router-dom";

export const QuizBoard = () => {
  const quizes = useAppSelector((state) => state.quizes.quizes);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("term")?.toLowerCase() || "";
  const preparedQuizes = quizes.filter((quiz) =>
    quiz.title.toLowerCase().includes(query)
  );

  return (
    <div className="flex flex-wrap mt-3 gap-4">
      {preparedQuizes.map((quiz) => (
        <QuizCard quiz={quiz} key={quiz.id} />
      ))}
    </div>
  );
};
