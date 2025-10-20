import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, AlertCircle } from 'lucide-react';

export const EmployerPayroll: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Folha de Pagamento</h1>
        <p className="text-gray-600 mt-2">Gerencie e acompanhe folha de pagamento</p>
      </div>

      <Card className="border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            Folha de Pagamento
          </CardTitle>
          <CardDescription>
            Funcionalidade em desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Página em construção</p>
              <p className="text-sm text-blue-700 mt-1">
                Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
                Todas as operações relacionadas a folha de pagamento estarão disponíveis aqui.
              </p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">Funcionalidade 1</h3>
                <p className="text-sm text-gray-600">Descrição breve da funcionalidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">Funcionalidade 2</h3>
                <p className="text-sm text-gray-600">Descrição breve da funcionalidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">Funcionalidade 3</h3>
                <p className="text-sm text-gray-600">Descrição breve da funcionalidade</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
