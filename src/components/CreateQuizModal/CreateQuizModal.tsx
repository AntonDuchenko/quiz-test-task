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
import { v4 as uuidv4 } from "uuid";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as quizesSlice from "../../features/quizesSlice";
import * as questionsSlice from "../../features/questionsSlice";
import { Question } from "../../types/Question";
import { toastError } from "../../utils/toastError";
import { toastSuccess } from "../../utils/toastSuccess";

export const CreateQuizModal = () => {
  const { isCreateQuiz, setIsCreateQuiz, setIsCreateQuestion } =
    useContext(QuizContext);

  const quizes = useAppSelector((state) => state.quizes.quizes);
  const questions = useAppSelector((state) => state.questions.questions);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleOnCloseModal = () => {
    setTitle("");
    setDuration("");
    setIsCreateQuiz(false);
    dispatch(questionsSlice.resetQuestions());
  };

  const handleOnQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleOnDurationChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDuration(e.target.value);

  const handleOnCreateQuestionClick = () => {
    setIsCreateQuiz(false);
    setIsCreateQuestion(true);
  };

  const handleOnEditingQuestion = (question: Question) => {
    setIsCreateQuiz(false);
    dispatch(questionsSlice.setEditingQuestion(question));
    setIsCreateQuestion(true);
  };

  const handleOnDeleteQuestion = (q: Question) => {
    const filteredQuestions = questions.filter(
      (question) => q.id !== question.id
    );
    dispatch(questionsSlice.setQuestions(filteredQuestions));
  };

  const handleOnClearForm = () => {
    setTitle("");
    setDuration("");
    dispatch(questionsSlice.resetQuestions());
  };

  const handleOnSave = () => {
    if (questions.length > 0) {
      dispatch(
        quizesSlice.setQuizes([
          ...quizes,
          {
            id: uuidv4(),
            title,
            duration: +duration,
            questions,
          },
        ])
      );
      setIsCreateQuiz(false);

      toastSuccess(`Quiz ${title} created!`);
    } else {
      toastError("To create quiz must be more than 1 question!");
    }
  };

  return (
    <div>
      <TEModal show={isCreateQuiz} setShow={setIsCreateQuiz} staticBackdrop>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Create new Quiz
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={handleOnCloseModal}
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
                onChange={handleOnQuizTitleChange}
                type="text"
                id="exampleFormControlInput1"
                label="Quiz title"
                value={title}
              />

              <TEInput
                onChange={handleOnDurationChange}
                type="number"
                id="exampleFormControlInputNumber"
                label="Duration(in minutes)"
                value={duration}
              />

              <CreateButton
                onClick={handleOnCreateQuestionClick}
                title="Create question"
              />

              <ul>
                {questions.map((q) => (
                  <li
                    key={q.id}
                    className="flex justify-between items-center overflow-hidden"
                  >
                    {q.title}
                    <div>
                      <button
                        onClick={() => handleOnEditingQuestion(q)}
                        type="button"
                        className="hover:bg-slate-300 transition-all p-2 rounded-lg"
                      >
                        <img
                          src={editIcon}
                          alt="edit-icon"
                          className="w-[20px]"
                        />
                      </button>

                      <button
                        onClick={() => handleOnDeleteQuestion(q)}
                        type="button"
                        className="hover:bg-slate-300 transition-all p-2 rounded-lg"
                      >
                        <img
                          src={deleteIcon}
                          alt="delete-icon"
                          className="w-[20px]"
                        />
                      </button>
                    </div>
                  </li>
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
                  onClick={handleOnClearForm}
                >
                  Clear
                </button>
              </TERipple>

              <TERipple rippleColor="light">
                <button
                  onClick={handleOnSave}
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
