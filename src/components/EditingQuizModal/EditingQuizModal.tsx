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
import { CreateButton } from "../CreateButton/CreateButton";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../context/quiz";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks";
import * as quizesSlice from "../../features/quizesSlice";
import * as questionsSlice from "../../features/questionsSlice";

export const EditingQuizModal = () => {
  const {
    setIsCreateQuestion,
    isEditingQuiz,
    setIsEditingQuiz,
  } = useContext(QuizContext);

  const { quizes, editingQuiz } = useAppSelector((state) => state.quizes);
  const questions = useAppSelector((state) => state.questions.questions);
  const dispatch = useAppDispatch();

  const { id, title, duration, questions: editingQuestions } = editingQuiz!;

  useEffect(() => {
    dispatch(questionsSlice.setQuestions(editingQuestions));
  }, [dispatch, editingQuestions]);

  const [newTitle, setNewTitle] = useState(title);
  const [newDuration, setNewDuration] = useState(duration.toString());

  return (
    <div>
      <TEModal show={isEditingQuiz} setShow={setIsEditingQuiz} staticBackdrop>
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
                onClick={() => {
                  setIsEditingQuiz(false);
                  dispatch(quizesSlice.removeEditingQuez());
                  dispatch(questionsSlice.resetQuestions());
                }}
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
                  setNewTitle(e.target.value)
                }
                required
                type="text"
                id="exampleFormControlInput1"
                label="Quiz title"
                value={newTitle}
              />

              <TEInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewDuration(e.target.value)
                }
                required
                type="number"
                id="exampleFormControlInputNumber"
                label="Duration(in minutes)"
                value={newDuration}
              />

              <CreateButton
                onClick={() => {
                  setIsEditingQuiz(false);
                  setIsCreateQuestion(true);
                }}
                title="Create question"
              />

              <h5 className="text-2xl text-center">Questions</h5>
              <ul>
                {questions.map((q) => (
                  <li
                    key={q.id}
                    className="flex justify-between items-center overflow-hidden"
                  >
                    {q.title}
                    <div>
                      <button
                        onClick={() => {
                          setIsEditingQuiz(false);
                          dispatch(questionsSlice.setEditingQuestion(q));
                          setIsCreateQuestion(true);
                        }}
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
                        onClick={() => {
                          const filteredQuestions = questions.filter(
                            (question) => q.id !== question.id
                          );
                          dispatch(
                            questionsSlice.setQuestions(filteredQuestions)
                          );
                        }}
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
                  onClick={() => {
                    setIsEditingQuiz(false);
                    dispatch(quizesSlice.removeEditingQuez());
                    dispatch(questionsSlice.resetQuestions());
                  }}
                >
                  Cancel
                </button>
              </TERipple>

              <TERipple rippleColor="light">
                <button
                  onClick={() => {
                    const newQuizes = quizes.map((quiz) =>
                      quiz.id === id
                        ? {
                            id,
                            title: newTitle,
                            duration: +newDuration,
                            questions,
                          }
                        : quiz
                    );

                    dispatch(quizesSlice.setQuizes(newQuizes));

                    setIsEditingQuiz(false);
                    dispatch(quizesSlice.removeEditingQuez());
                    dispatch(questionsSlice.resetQuestions());
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
