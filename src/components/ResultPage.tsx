import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useQuiz } from '../context/QuizContext';
import { results } from '../data/questions';
import { Separator } from './ui/separator';

const ResultPage: React.FC = () => {
  const { getResult, goToNextQuestion } = useQuiz();
  const resultType = getResult();
  const result = results[resultType];

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Результаты теста</CardTitle>
          <CardDescription className="text-primary-foreground">
            Мы проанализировали ваши ответы
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">{result.title}</h2>
          </div>
          
          <p className="text-lg">{result.description}</p>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="font-semibold">Анализы для консультации:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.analyses.map((analysis, index) => (
                <li key={index}>{analysis}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button 
            onClick={goToNextQuestion}
            className="w-full md:w-auto"
            size="lg"
          >
            Продолжить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultPage;
