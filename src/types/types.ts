export type Answer = {
  questionId: number;
  optionIndex: number;
};

export type UserData = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type ResultType = 'ДЕТОКС' | 'СНИЖЕНИЕ ВЕСА' | 'ЭНЕРГИЯ';

export type Question = {
  id: number;
  text: string;
  options: string[];
};

export type Result = {
  type: ResultType;
  title: string;
  description: string;
  analyses: string[];
};

export type QuizResult = {
  id: string;
  date: string;
  userData: UserData;
  result: ResultType;
  answers: Answer[];
};
