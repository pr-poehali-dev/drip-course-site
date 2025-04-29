import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { results } from '../data/questions';
import { Badge } from './ui/badge';
import { CheckCircle } from 'lucide-react';

const ResultPage: React.FC = () => {
  const { getResult, goToNextQuestion } = useQuiz();
  const resultType = getResult();
  const result = results[resultType];

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Ваш результат</CardTitle>
          <CardDescription className="text-primary-foreground">
            Рекомендуемый курс капельниц
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center mb-8">
            <Badge className="mb-2 text-lg py-1 px-4">{result.type}</Badge>
            <h2 className="text-2xl font-bold mb-4">{result.title}</h2>
            <p className="text-muted-foreground">{result.description}</p>
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Анализы для консультации:</h3>
            <ul className="space-y-2">
              {result.analyses.map((analysis, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{analysis}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="text-sm">
              Для получения подробной консультации и записи на процедуры, пожалуйста, оставьте свои контактные данные.
              Наш специалист свяжется с вами в ближайшее время.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button 
            onClick={goToNextQuestion}
            size="lg"
            className="w-full md:w-auto"
          >
            Продолжить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultPage;
