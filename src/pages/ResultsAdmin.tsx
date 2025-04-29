import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { QuizResult } from '../types/types';

const ResultsAdmin: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    // Load results from localStorage
    const storedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    setResults(storedResults);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const getBadgeColor = (resultType: string) => {
    switch (resultType) {
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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Результаты тестирования</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Нет данных для отображения
            </div>
          ) : (
            <Table>
              <TableCaption>Список всех результатов тестирования</TableCaption>
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
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{formatDate(result.date)}</TableCell>
                    <TableCell>{result.userData.firstName}</TableCell>
                    <TableCell>{result.userData.lastName}</TableCell>
                    <TableCell>{result.userData.phone}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(result.result)}>
                        {result.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsAdmin;
