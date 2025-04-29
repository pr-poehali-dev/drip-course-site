import React from 'react';
import ConsentPage from '../components/ConsentPage';
import QuizQuestion from '../components/QuizQuestion';
import ResultPage from '../components/ResultPage';
import UserInfoForm from '../components/UserInfoForm';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';

const Index: React.FC = () => {
  const { currentQuestionIndex, userConsent } = useQuiz();

  // Show consent page if user hasn't consented yet
  if (!userConsent) {
    return <ConsentPage />;
  }

  // Show questions
  if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
    return <QuizQuestion />;
  }

  // Show results page
  if (currentQuestionIndex === questions.length) {
    return <ResultPage />;
  }

  // Show user info form
  if (currentQuestionIndex === questions.length + 1) {
    return <UserInfoForm />;
  }

  return null;
};

export default Index;
