import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';

const QuizQuestion: React.FC = () => {
  const { 
    currentQuestionIndex, 
    answers, 
    goToNextQuestion, 
    goToPreviousQuestion, 
    answerQuestion 
  } = useQuiz();

  const question = questions[currentQuestionIndex];
  const selectedOption = answers.find(a => a.questionId === question.id)?.optionIndex;

  const handleOptionChange = (optionIndex: number) => {
    answerQuestion(question.id, optionIndex);
  };

  const handleNext = () => {
    goToNextQuestion();
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">Вопрос {currentQuestionIndex + 1} из {questions.length}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
          
          <RadioGroup 
            value={selectedOption !== undefined ? selectedOption.toString() : undefined}
            onValueChange={(value) => handleOptionChange(parseInt(value))}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-0">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Назад
          </Button>
          <Button 
            onClick={handleNext}
            disabled={selectedOption === undefined}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizQuestion;
