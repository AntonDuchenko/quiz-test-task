import {
  TEDropdown,
  TEDropdownItem,
  TEDropdownMenu,
  TEDropdownToggle,
  TERipple,
} from "tw-elements-react";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import { Quiz } from "../../types/Quiz";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as quizesSlice from "../../features/quizesSlice";
import { toastSuccess } from "../../utils/toastSuccess";

interface Props {
  quiz: Quiz;
}

export const DotsDropDown: React.FC<Props> = ({ quiz }) => {
  const { setIsEditingQuiz } = useContext(QuizContext);
  const dispatch = useAppDispatch();
  const quizes = useAppSelector((state) => state.quizes.quizes);

  const handleOnEdit = () => {
    setIsEditingQuiz(true);
    dispatch(quizesSlice.setEditingQuez(quiz));
  };

  const handleOnDelete = () => {
    const newQuizes = quizes.filter((q) => quiz.id !== q.id);
    dispatch(quizesSlice.setQuizes(newQuizes));

    toastSuccess(`Quiz ${quiz.title} deleted!`);
  };

  return (
    <TEDropdown>
      <TERipple rippleColor="light" className="w-full">
        <TEDropdownToggle
          className="inline-flex items-center p-2 text-sm 
        font-medium text-center text-gray-900 bg-white 
        rounded-lg hover:bg-gray-100 
        focus:outline-none"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu className="w-full !min-w-[200px]">
        <TEDropdownItem>
          <button
            onClick={handleOnEdit}
            type="button"
            className="hover:bg-gray-300 w-full transition-all
              bg-gray-200 flex items-center gap-2 px-4 py-2"
          >
            <img src={editIcon} alt="edit.svg" className="h-[16px]" />
            Edit
          </button>
        </TEDropdownItem>

        <TEDropdownItem>
          <button
            onClick={handleOnDelete}
            type="button"
            className="hover:bg-gray-300 flex items-center px-4 py-2 gap-2
               text-[#ff0000] w-full bg-gray-200 transition-all"
          >
            <img src={deleteIcon} alt="delete.svg" className="h-[16px]" />
            Delete
          </button>
        </TEDropdownItem>
      </TEDropdownMenu>
    </TEDropdown>
  );
};
