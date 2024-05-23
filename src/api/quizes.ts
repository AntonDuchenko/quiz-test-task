import { Quiz } from '../types/Quiz';
import { getData } from "../utils/getData";

export async function getQuizes() {
  return getData<Quiz[]>("quizes", 1000).then((res) => res);
}
