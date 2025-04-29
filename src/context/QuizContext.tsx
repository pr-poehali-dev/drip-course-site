import React, { createContext, useContext, useState } from 'react';
import { Answer, ResultType, UserData } from '../types/types';
import { questions } from '../data/questions';

type QuizContextType = {
  currentQuestionIndex: number;
  answers: Answer[];
  answersCount: [number, number, number];
  userConsent: boolean;
  userData: Partial<UserData>;
  setUserConsent: (consent: boolean) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  answerQuestion: (questionId: number, optionIndex: number) => void;
  getResult: () => ResultType;
  updateUserData: (data: Partial<UserData>) => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for consent page
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [userConsent, setUserConsent] = useState(false);
  const [userData, setUserData] = useState<Partial<UserData>>({});

  // Count answers by option index (0, 1, 2)
  const answersCount: [number, number, number] = answers.reduce(
    (counts, answer) => {
      counts[answer.optionIndex] += 1;
      return counts;
    },
    [0, 0, 0]
  );

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const answerQuestion = (questionId: number, optionIndex: number) => {
    setAnswers(prev => {
      const newAnswers = prev.filter(a => a.questionId !== questionId);
      return [...newAnswers, { questionId, optionIndex }];
    });
  };

  const getResult = (): ResultType => {
    // Find the option with maximum selections
    const maxIndex = answersCount.indexOf(Math.max(...answersCount));
    
    // Map index to result type
    const resultMap: ResultType[] = ['ДЕТОКС', 'СНИЖЕНИЕ ВЕСА', 'ЭНЕРГИЯ'];
    return resultMap[maxIndex];
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(-1);
    setAnswers([]);
    setUserConsent(false);
    setUserData({});
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        answers,
        answersCount,
        userConsent,
        userData,
        setUserConsent,
        goToNextQuestion,
        goToPreviousQuestion,
        answerQuestion,
        getResult,
        updateUserData,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
