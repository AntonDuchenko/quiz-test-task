import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QuizProvider } from "./context/quiz.tsx";
import { Provider } from "react-redux";
import { store } from './app/store.ts';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QuizProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </QuizProvider>
);
