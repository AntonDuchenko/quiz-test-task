import { useContext, useEffect, useState } from "react";
import {
  TEInput,
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
  TESelect,
} from "tw-elements-react";
import { QuizContext } from "../../context/quiz";
import { CreateButton } from "../CreateButton/CreateButton";
import { v4 as uuidv4 } from "uuid";
import deleteIcon from "../../assets/delete.svg";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as questionsSlice from "../../features/questionsSlice";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { toastError } from "../../utils/toastError";
import { toastSuccess } from "../../utils/toastSuccess";

export const CreateQuestionModal = () => {
  const {
    setIsCreateQuestion,
    isCreateQuestion,
    setIsCreateQuiz,
    setIsEditingQuiz,
  } = useContext(QuizContext);

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState(1);
  const [isCreateOption, setIsCreateOption] = useState(false);

  const dispatch = useAppDispatch();
  const { questions, editingQuestion } = useAppSelector(
    (state) => state.questions
  );
  const editingQuiz = useAppSelector((state) => state.quizes.editingQuiz);

  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion.title);
      setOptions(editingQuestion.options);
      setAnswer(editingQuestion.answer);
    }
  }, [editingQuestion]);

  const clearForm = () => {
    setQuestion("");
    setOption("");
    setOptions([]);
  };

  const handlerOnSelectAnswer = (event: SelectData[] | SelectData) =>
    setAnswer(Array.isArray(event) ? event[0].text! : event.text!);

  const optionCount = options.length + 1;
  const data = options.map((option, index) => {
    return {
      text: option,
      value: index + 1,
    };
  });
  const value = data.find((opt) => opt.text === answer)?.value || 1;

  const handleOnModalClose = () => {
    setIsCreateQuestion(false);
    dispatch(questionsSlice.removeEditingQuestion());

    if (editingQuiz) {
      setIsEditingQuiz(true);
    } else {
      setIsCreateQuiz(true);
    }

    clearForm();
  };

  const handleOnChangeQuestionValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setQuestion(e.target.value);

  const handleOnChangePointsValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPoints(+e.target.value);

  const handleOnChangeOptionValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOption(e.target.value);

  const handleOnOptionInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const isExist = options.find((opt) => opt === option);
    e.preventDefault();

    if (isExist) {
      toastError(`Option ${option} already exist! Let's create new!`);

      return;
    }

    setOptions(() => [...options, option]);
    setOption("");
    setIsCreateOption(false);

    toastSuccess(`Option ${option} created!`);
  };

  const handleOnCreateClickOption = () => {
    setIsCreateOption(true);
  };

  const handleOnDeleteOption = () => {
    setOptions(options.filter((opt) => opt !== option));

    toastSuccess(`Option ${option} deleted!`);
  };

  const handleOnClearForm = () => {
    clearForm();
    setIsCreateOption(false);
  };

  const handleOnSaveQuestion = () => {
    if (options.length >= 2) {
      const isEditing = questions.find((q) => q.id === editingQuestion?.id);

      const updatedQuestions = isEditing
        ? questions.map((q) =>
            q.id === editingQuestion?.id
              ? {
                  id: editingQuestion.id,
                  title: question,
                  options,
                  points,
                  answer,
                }
              : q
          )
        : [
            ...questions,
            {
              id: uuidv4(),
              title: question,
              options,
              points,
              answer,
            },
          ];

      dispatch(questionsSlice.setQuestions(updatedQuestions));

      if (editingQuiz) {
        setIsEditingQuiz(true);
      } else {
        setIsCreateQuiz(true);
      }

      clearForm();
      dispatch(questionsSlice.removeEditingQuestion());
      setIsCreateQuestion(false);

      toastSuccess(`Question ${question} with options created!`);
    } else {
      toastError("To create quetion must be more than 2 options");
    }
  };

  return (
    <TEModal show={isCreateQuestion} setShow={() => {}}>
      <TEModalDialog>
        <TEModalContent>
          <TEModalHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Questions
            </h5>

            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={handleOnModalClose}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </TEModalHeader>

          <TEModalBody className="flex flex-col gap-3">
            <TEInput
              onChange={handleOnChangeQuestionValue}
              type="text"
              label="Question"
              value={question}
            />

            {options.length >= 2 && (
              <div className="flex justify-center">
                <div className="relative mb-3 w-full pt-5">
                  <TESelect
                    value={value}
                    data={data}
                    label="Answer"
                    onValueChange={handlerOnSelectAnswer}
                  />
                </div>
              </div>
            )}

            <TEInput
              onChange={handleOnChangePointsValue}
              type="number"
              id="exampleFormControlInputNumber"
              label="Points per question(Optional)"
              defaultValue={points}
            />

            {isCreateOption ? (
              <form onSubmit={handleOnOptionInputSubmit}>
                <TEInput
                  onChange={handleOnChangeOptionValue}
                  autoFocus
                  type="text"
                  label={`Option ${optionCount}`}
                  value={option}
                />
              </form>
            ) : (
              <CreateButton
                onClick={handleOnCreateClickOption}
                title="Create option"
              />
            )}

            {options.length > 0 && (
              <>
                <h5 className="text-2xl text-center">Options</h5>
                <ul className="flex flex-col gap-1 overflow-auto max-h-[200px]">
                  {options.map((option) => (
                    <li
                      className="border-solid border-2 shrink-0 rounded-md px-3 py-1 flex justify-between items-center overflow-hidden"
                      key={option}
                    >
                      {option}
                      <button
                        onClick={handleOnDeleteOption}
                        type="button"
                        className="hover:bg-slate-300 transition-all p-2 rounded-lg"
                      >
                        <img
                          src={deleteIcon}
                          alt="delete-icon"
                          className="w-[20px]"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </TEModalBody>

          <TEModalFooter>
            <TERipple rippleColor="light">
              <button
                type="button"
                className="inline-block rounded bg-slate-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal 
                  text-primary-700 transition-all hover:bg-slate-400 
                  focus:bg-slate-400 focus:outline-none focus:ring-0 active:bg-slate-400"
                onClick={handleOnClearForm}
              >
                Clear
              </button>
            </TERipple>

            <TERipple rippleColor="light">
              <button
                onClick={handleOnSaveQuestion}
                type="button"
                className="ml-1 inline-block rounded bg-slate-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal 
                  text-white shadow-[0_4px_9px_-4px_#3b71ca] transition-all
                   hover:bg-slate-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                   focus:bg-slate-800 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                   focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                   dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                   dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                   dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save
              </button>
            </TERipple>
          </TEModalFooter>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
