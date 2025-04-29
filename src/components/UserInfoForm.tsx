import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useQuiz } from '../context/QuizContext';
import { useToast } from './ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const UserInfoForm: React.FC = () => {
  const { userData, updateUserData, goToNextQuestion, answers, getResult } = useQuiz();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData.firstName || !userData.lastName || !userData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }
    
    // Validate phone number
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(userData.phone)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send this data to a backend
      // For now, we'll just simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save results to localStorage (in a real app, send to server)
      const quizResult = {
        id: uuidv4(),
        date: new Date().toISOString(),
        userData,
        result: getResult(),
        answers
      };
      
      // Get existing results or initialize empty array
      const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      localStorage.setItem('quizResults', JSON.stringify([...existingResults, quizResult]));
      
      // Show success message
      toast({
        title: "Данные отправлены",
        description: "Спасибо за прохождение теста! Мы свяжемся с вами в ближайшее время.",
      });
      
      // Go to thank you page
      goToNextQuestion();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-xl font-bold">
            Контактная информация
          </CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input 
                id="firstName"
                name="firstName"
                placeholder="Введите ваше имя"
                value={userData.firstName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Отчество</Label>
              <Input 
                id="lastName"
                name="lastName"
                placeholder="Введите ваше отчество"
                value={userData.lastName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input 
                id="phone"
                name="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={userData.phone || ''}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Формат: +7 (XXX) XXX-XX-XX
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end p-6 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить результаты"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserInfoForm;
