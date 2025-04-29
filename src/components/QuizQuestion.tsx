import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useQuiz } from '../context/QuizContext';
import { questions } from '../data/questions';
import { cn } from '../lib/utils';

const QuizQuestion: React.FC = () => {
  const { currentQuestionIndex, answers, answerQuestion, goToNextQuestion, goToPreviousQuestion } = useQuiz();
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  // Find if user has already answered this question
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
  
  const handleOptionClick = (optionIndex: number) => {
    answerQuestion(currentQuestion.id, optionIndex);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-xl font-bold">
            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
          </CardTitle>
        </CardHeader>
        
        <div className="h-2 w-full bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
        
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                  currentAnswer?.optionIndex === index 
                    ? "border-primary bg-primary/10" 
                    : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                )}
                onClick={() => handleOptionClick(index)}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 pt-2">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Назад
          </Button>
          
          <Button
            onClick={goToNextQuestion}
            disabled={!currentAnswer}
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Завершить" : "Далее"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizQuestion;
