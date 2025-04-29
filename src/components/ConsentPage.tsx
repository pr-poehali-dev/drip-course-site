import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { useQuiz } from '../context/QuizContext';

const ConsentPage: React.FC = () => {
  const { userConsent, setUserConsent, goToNextQuestion } = useQuiz();

  const handleConsent = () => {
    if (userConsent) {
      goToNextQuestion();
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Добро пожаловать в тест</CardTitle>
          <CardDescription className="text-primary-foreground">
            Узнайте, какой курс капельниц Вам подойдет
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Определите свой идеальный курс капельниц</h2>
            <p className="text-muted-foreground">
              Пройдите короткий тест из 11 вопросов и получите персональную рекомендацию
            </p>
          </div>

          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Согласие на обработку персональных данных</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Перед прохождением теста, пожалуйста, подтвердите согласие на обработку
              персональных данных. Ваши данные будут использованы только для предоставления
              результатов теста и не будут переданы третьим лицам.
            </p>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="consent" 
                checked={userConsent} 
                onCheckedChange={(checked) => setUserConsent(!!checked)} 
              />
              <Label 
                htmlFor="consent" 
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Я даю согласие на обработку моих персональных данных в соответствии с 
                Федеральным законом №152-ФЗ "О персональных данных"
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button 
            onClick={handleConsent} 
            disabled={!userConsent}
            className="w-full md:w-auto"
            size="lg"
          >
            Начать тест
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsentPage;
