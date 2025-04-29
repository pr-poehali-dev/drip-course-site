import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const QuizQuestion: React.FC = () => {
  const { 
    currentQuestionIndex, 
    answerQuestion, 
    goToNextQuestion, 
    goToPreviousQuestion,
    answers
  } = useQuiz();

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  // Check if current question is already answered
  const currentAnswer = answers.find(a => a.questionId === question.id);
  const selectedOption = currentAnswer ? currentAnswer.optionIndex : -1;

  const [localSelection, setLocalSelection] = React.useState<number>(selectedOption);

  React.useEffect(() => {
    setLocalSelection(selectedOption);
  }, [selectedOption, currentQuestionIndex]);

  const handleOptionSelect = (value: string) => {
    const optionIndex = parseInt(value);
    setLocalSelection(optionIndex);
    answerQuestion(question.id, optionIndex);
  };

  const handleNext = () => {
    if (localSelection !== -1) {
      goToNextQuestion();
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Вопрос {currentQuestionIndex + 1} из {totalQuestions}</CardTitle>
          <CardDescription className="text-primary-foreground">
            Узнайте, какой курс капельниц Вам подойдет
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
          
          <RadioGroup value={localSelection.toString()} onValueChange={handleOptionSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer w-full">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 pt-0">
          <Button 
            variant="outline" 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Назад
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={localSelection === -1}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizQuestion;
