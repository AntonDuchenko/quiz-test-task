import { useContext, useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
} from "tw-elements-react";
import { QuizContext } from "../../context/quiz";
import { CreateButton } from "../CreateButton/CreateButton";
import { v4 as uuidv4 } from 'uuid';

export const CreateQuizModal = () => {
  const {
    isCreateQuiz,
    setIsCreateQuiz,
    setQuizes,
    quizes,
    setIsCreateQuestion,
    questions
  } = useContext(QuizContext);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div>
      <TEModal show={isCreateQuiz} setShow={setIsCreateQuiz}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Create new Quiz
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setIsCreateQuiz(false)}
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
                  setTitle(e.target.value)
                }
                type="text"
                id="exampleFormControlInput1"
                label="Quiz title"
                value={title}
              />

              <TEInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDuration(e.target.value)
                }
                type="number"
                id="exampleFormControlInputNumber"
                label="Duration(in minutes)"
                value={duration}
              />

              <CreateButton
                onClick={() => {
                  setIsCreateQuiz(false);
                  setIsCreateQuestion(true);
                }}
                title="Create question"
              />

              <ul>
                {questions.map(q => (
                  <li key={q.id}>{q.title}</li>
                ))}
              </ul>
            </TEModalBody>

            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-slate-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal 
                  text-primary-700 transition-all hover:bg-slate-400 
                  focus:bg-slate-400 focus:outline-none focus:ring-0 active:bg-slate-400"
                  onClick={() => {
                    setTitle("");
                    setDuration("");
                  }}
                >
                  Clear
                </button>
              </TERipple>

              <TERipple rippleColor="light">
                <button
                  onClick={() => {
                    setQuizes([...quizes, {
                      id: uuidv4(),
                      title,
                      duration: +duration,
                      questions,
                    }]);

                    setIsCreateQuiz(false);
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
    </div>
  );
};
