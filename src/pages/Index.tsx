import React from 'react';
import { useQuiz } from '../context/QuizContext';
import ConsentPage from '../components/ConsentPage';
import QuizQuestion from '../components/QuizQuestion';
import ResultPage from '../components/ResultPage';
import UserInfoForm from '../components/UserInfoForm';
import { questions } from '../data/questions';

const Index: React.FC = () => {
  const { currentQuestionIndex } = useQuiz();

  // Render based on currentQuestionIndex
  if (currentQuestionIndex === -1) {
    return <ConsentPage />;
  } else if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
    return <QuizQuestion />;
  } else if (currentQuestionIndex === questions.length) {
    return <ResultPage />;
  } else if (currentQuestionIndex === questions.length + 1) {
    return <UserInfoForm />;
  }

  // Fallback
  return <ConsentPage />;
};

export default Index;
