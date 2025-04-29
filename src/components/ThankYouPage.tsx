import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useQuiz } from '../context/QuizContext';
import { Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  const { resetQuiz } = useQuiz();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Спасибо!</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-semibold mb-4">Ваша заявка принята</h2>
          <p className="text-lg mb-6">
            Мы получили ваши данные и свяжемся с вами в ближайшее время для консультации по программе капельниц.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Link to="/">
            <Button 
              onClick={resetQuiz}
              className="w-full md:w-auto"
              size="lg"
            >
              Пройти тест снова
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouPage;
