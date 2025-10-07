import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, Eye, EyeOff } from 'lucide-react';
import type { BankAccount } from '@/types';
import { accountService } from '@/services/mockData';
import { Button } from '@/components/ui/button';

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBalances, setShowBalances] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await accountService.getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Erro ao carregar contas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const formatCurrency = (value: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getAccountTypeName = (type: string) => {
    const types: Record<string, string> = {
      checking: 'Conta Corrente',
      savings: 'Poupança',
      investment: 'Investimento'
    };
    return types[type] || type;
  };

  const getAccountTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      checking: 'bg-blue-900',
      savings: 'bg-green-600',
      investment: 'bg-orange-600'
    };
    return colors[type] || 'bg-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando contas...</p>
        </div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contas Bancárias</h1>
          <p className="text-gray-600 mt-1">Gerencie suas contas empresariais</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowBalances(!showBalances)}
          className="gap-2"
        >
          {showBalances ? (
            <>
              <EyeOff className="h-4 w-4" />
              Ocultar Saldos
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Mostrar Saldos
            </>
          )}
        </Button>
      </div>

      {/* Card de Saldo Total */}
      <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Saldo Total Consolidado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-blue-200 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Todas as contas somadas
          </p>
        </CardContent>
      </Card>

      {/* Lista de Contas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card
            key={account.id}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={`${getAccountTypeColor(account.type)} text-white`}>
                  {getAccountTypeName(account.type)}
                </Badge>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Agência</p>
                <p className="text-lg font-semibold text-gray-900">{account.agency}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Conta</p>
                <p className="text-lg font-semibold text-gray-900">{account.accountNumber}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-1">Saldo Disponível</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(account.balance)}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  Extrato
                </Button>
                <Button variant="outline" className="flex-1">
                  Transferir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-1">Total de Contas</p>
              <p className="text-2xl font-bold text-blue-900">{accounts.length}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-1">Conta Principal</p>
              <p className="text-lg font-bold text-green-900">
                {accounts.find(a => a.type === 'checking')?.accountNumber || 'N/A'}
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-1">Investimentos</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(accounts.find(a => a.type === 'investment')?.balance || 0)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Dicas de Segurança</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Nunca compartilhe suas senhas ou tokens de acesso</li>
              <li>Verifique sempre o destinatário antes de realizar transferências</li>
              <li>Mantenha seu aplicativo e navegador atualizados</li>
              <li>Ative a autenticação de dois fatores para maior segurança</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
