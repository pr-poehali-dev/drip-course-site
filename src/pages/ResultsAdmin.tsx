import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { QuizResult } from '../types/types';
import { format } from 'date-fns';

const ResultsAdmin: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    // Для демонстрации используем localStorage
    const fetchResults = () => {
      setIsLoading(true);
      try {
        const storedResults = localStorage.getItem('quizResults');
        if (storedResults) {
          setResults(JSON.parse(storedResults));
        }
      } catch (error) {
        console.error('Ошибка при загрузке результатов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getResultColor = (resultType: string) => {
    switch (resultType) {
      case 'ДЕТОКС':
        return 'bg-green-100 text-green-800';
      case 'СНИЖЕНИЕ ВЕСА':
        return 'bg-blue-100 text-blue-800';
      case 'ЭНЕРГИЯ':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Результаты тестирования</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Результаты не найдены</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Отчество</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Рекомендация</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        {format(new Date(result.date), 'dd.MM.yyyy HH:mm')}
                      </TableCell>
                      <TableCell>{result.userData.firstName}</TableCell>
                      <TableCell>{result.userData.lastName}</TableCell>
                      <TableCell>{result.userData.phone}</TableCell>
                      <TableCell>
                        <Badge className={getResultColor(result.result)}>
                          {result.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsAdmin;
