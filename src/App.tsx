import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { QuizPage } from "./pages/QuizPage";

function App() {
  return (
    <div className="container m-auto h-svh">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/quizes" />} />
          <Route path="/quizes" element={<BoardPage />} />
          <Route path="/quizes/:quizId" element={<QuizPage />}>
            <Route path=":questionId" element={<QuizPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
