import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useQuiz } from '../context/QuizContext';
import { results } from '../data/questions';

const ResultPage: React.FC = () => {
  const { getResult, goToNextQuestion } = useQuiz();
  const resultType = getResult();
  const result = results[resultType];

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-white text-center">
          <CardTitle className="text-2xl font-bold">
            Ваш результат
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
              {resultType === 'ДЕТОКС' && (
                <span className="text-4xl">🌿</span>
              )}
              {resultType === 'СНИЖЕНИЕ ВЕСА' && (
                <span className="text-4xl">⚖️</span>
              )}
              {resultType === 'ЭНЕРГИЯ' && (
                <span className="text-4xl">⚡</span>
              )}
            </div>
            <h2 className="text-xl font-bold mb-2">{result.title}</h2>
            <p className="text-gray-600 mb-6">{result.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Анализы для консультации:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {result.analyses.map((analysis, index) => (
                <li key={index} className="text-gray-700">{analysis}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center p-6">
          <Button onClick={goToNextQuestion}>
            Оставить контактные данные
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultPage;
