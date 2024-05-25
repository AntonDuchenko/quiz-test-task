import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { QuizPage } from "./pages/QuizPage";
import { QuizResultPage } from "./pages/QuizResulPage";
import { useEffect } from "react";
import { useAppDispatch } from "./app/reduxHooks";
import * as quizesSlice from "./features/quizesSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(quizesSlice.init());
  }, [dispatch]);

  return (
    <div className="container m-auto h-svh px-2">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/quizes" />} />
          <Route path="/quizes" element={<BoardPage />}></Route>
          <Route path="/quizes/:quizId" element={<QuizPage />}>
            <Route path=":questionId?" element={<QuizPage />} />
          </Route>
          <Route path="finish" element={<QuizResultPage />} />
        </Routes>
      </HashRouter>

      <ToastContainer newestOnTop />
    </div>
  );
}

export default App;
