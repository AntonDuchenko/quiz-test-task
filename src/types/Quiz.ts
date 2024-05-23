import { Question } from './Question';

export interface Quiz {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}
