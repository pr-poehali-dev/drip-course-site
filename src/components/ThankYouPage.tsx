import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useQuiz } from '../context/QuizContext';

const ThankYouPage: React.FC = () => {
  const { resetQuiz } = useQuiz();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-lg text-center">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-2xl font-bold">
            Спасибо за прохождение теста!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-semibold mb-4">Ваши результаты приняты</h2>
          <p className="text-gray-600">
            Наш специалист свяжется с вами в ближайшее время для консультации 
            и записи на прием.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center p-6">
          <Button onClick={resetQuiz}>
            Пройти тест еще раз
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouPage;
