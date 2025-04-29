import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/ui/use-toast';

const UserInfoForm: React.FC = () => {
  const { userData, updateUserData, getResult, answers } = useQuiz();
  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }
    
    // Update user data in context
    updateUserData({ firstName, lastName, phone });
    
    // Save result to localStorage
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      userData: { firstName, lastName, phone },
      result: getResult(),
      answers
    });
    localStorage.setItem('quizResults', JSON.stringify(results));
    
    // Navigate to thank you page
    navigate('/thank-you');
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Ваши контактные данные</CardTitle>
          <CardDescription className="text-primary-foreground">
            Мы свяжемся с вами для консультации
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите ваше имя"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Отчество</Label>
              <Input 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Введите ваше отчество"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-6 pt-0">
            <Button 
              type="submit"
              className="w-full md:w-auto"
              size="lg"
            >
              Отправить
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserInfoForm;
