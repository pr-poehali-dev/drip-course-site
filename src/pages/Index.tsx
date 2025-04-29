import React from 'react';
import { useQuiz } from '../context/QuizContext';
import ConsentPage from '../components/ConsentPage';
import QuizQuestion from '../components/QuizQuestion';
import ResultPage from '../components/ResultPage';
import UserInfoForm from '../components/UserInfoForm';
import ThankYouPage from '../components/ThankYouPage';
import { questions } from '../data/questions';

const Index = () => {
  const { currentQuestionIndex, userConsent } = useQuiz();
  
  // Если пользователь не дал согласие, показываем страницу согласия
  if (!userConsent) {
    return <ConsentPage />;
  }
  
  // Если текущий индекс вопроса в пределах массива вопросов, показываем вопрос
  if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
    return <QuizQuestion />;
  }
  
  // Показываем страницу результатов
  if (currentQuestionIndex === questions.length) {
    return <ResultPage />;
  }
  
  // Показываем форму для ввода контактных данных
  if (currentQuestionIndex === questions.length + 1) {
    return <UserInfoForm />;
  }
  
  // Показываем страницу благодарности
  if (currentQuestionIndex === questions.length + 2) {
    return <ThankYouPage />;
  }
  
  return null;
};

export default Index;
