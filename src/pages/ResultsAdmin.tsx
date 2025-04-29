import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type ResultEntry = {
  id: number;
  firstName: string;
  middleName: string;
  phone: string;
  result: string;
  date: string;
};

const ResultsAdmin: React.FC = () => {
  const [results, setResults] = useState<ResultEntry[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    setResults(savedResults);
  }, []);
  
  const getBadgeColor = (result: string) => {
    switch(result) {
      case 'ДЕТОКС':
        return 'bg-green-100 text-green-800';
      case 'СНИЖЕНИЕ ВЕСА':
        return 'bg-blue-100 text-blue-800';
      case 'ЭНЕРГИЯ':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Результаты тестирования</CardTitle>
          <CardDescription>
            Список пользователей, прошедших тест
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <Table>
              <TableCaption>Всего записей: {results.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Отчество</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Результат</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {format(new Date(entry.date), 'dd.MM.yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{entry.firstName}</TableCell>
                    <TableCell>{entry.middleName || '—'}</TableCell>
                    <TableCell>{entry.phone}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(entry.result)}>
                        {entry.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Пока нет данных
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsAdmin;
