import { useContext, useState } from "react";
import {
  TEInput,
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
} from "tw-elements-react";
import { QuizContext } from "../../context/quiz";
import { CreateButton } from "../CreateButton/CreateButton";
import { v4 as uuidv4 } from "uuid";

export const CreateQuestionModal = () => {
  const { setIsCreateQuestion, isCreateQuestion, setQuestions, questions, setIsCreateQuiz } = useContext(QuizContext);

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [isCreateOption, setIsCreateOption] = useState(false);

  const clearForm = () => {
    setQuestion("");
    setOption("");
    setOptions([]);
  }

  const optionCount = options.length + 1;

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
              onClick={() => setIsCreateQuestion(false)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuestion(e.target.value)
              }
              type="text"
              label="Question"
              value={question}
            />

            {isCreateOption ? (
              <form
                onSubmit={(e) => {
                  const isExist = options.find((opt) => opt === option);
                  if (isExist) {
                    console.log("Already exist");

                    return;
                  }

                  e.preventDefault();
                  setOptions(() => [...options, option]);
                  setOption("");
                  setIsCreateOption(false);
                }}
              >
                <TEInput
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOption(e.target.value)
                  }
                  autoFocus
                  type="text"
                  label={`Option ${optionCount}`}
                  value={option}
                />
              </form>
            ) : (
              <CreateButton
                onClick={() => {
                  setIsCreateOption(true);
                }}
                title="Create option"
              />
            )}

            {options.length > 0 && (
              <>
                <h5>Options</h5>
                <ul className="flex flex-col gap-1 overflow-auto max-h-[200px]">
                  {options.map((option) => (
                    <li
                      className="border-solid border-2 rounded-md px-3 py-1"
                      key={option}
                    >
                      {option}
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
                onClick={() => {
                  clearForm();
                  setIsCreateOption(false);
                }}
              >
                Clear
              </button>
            </TERipple>

            <TERipple rippleColor="light">
              <button
                onClick={() => {
                  setQuestions([...questions, {
                    id: uuidv4(),
                    title: question,
                    options,
                    answer: "",
                  }]);

                  clearForm();
                  setIsCreateQuestion(false);
                  setIsCreateQuiz(true);
                }}
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