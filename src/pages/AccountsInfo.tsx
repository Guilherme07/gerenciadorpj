import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Wallet, 
  Eye, 
  EyeOff, 
  Download, 
  Filter,
  Search,
  Building2,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const AccountsInfo: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('all');

  const accountGroups = [
    { id: 'all', name: 'Todas as contas', count: 5 },
    { id: 'operational', name: 'Operacionais', count: 3 },
    { id: 'investment', name: 'Investimentos', count: 1 },
    { id: 'payroll', name: 'Folha de pagamento', count: 1 },
  ];

  const accounts = [
    {
      id: 1,
      type: 'Conta Corrente PJ',
      agency: '0001',
      number: '12345-6',
      balance: 285430.50,
      group: 'operational',
      status: 'Ativa',
      lastMovement: '14/10/2025',
      manager: 'Carlos Silva',
      phone: '(11) 3003-0001'
    },
    {
      id: 2,
      type: 'Conta Poupança PJ',
      agency: '0001',
      number: '78901-2',
      balance: 150000.00,
      group: 'operational',
      status: 'Ativa',
      lastMovement: '13/10/2025',
      manager: 'Carlos Silva',
      phone: '(11) 3003-0001'
    },
    {
      id: 3,
      type: 'Conta Investimento',
      agency: '0001',
      number: '34567-8',
      balance: 500000.00,
      group: 'investment',
      status: 'Ativa',
      lastMovement: '14/10/2025',
      manager: 'Ana Paula',
      phone: '(11) 3003-0002'
    },
    {
      id: 4,
      type: 'Conta Salário',
      agency: '0001',
      number: '45678-9',
      balance: 85000.00,
      group: 'payroll',
      status: 'Ativa',
      lastMovement: '10/10/2025',
      manager: 'Carlos Silva',
      phone: '(11) 3003-0001'
    },
    {
      id: 5,
      type: 'Conta Corrente - Filial SP',
      agency: '0002',
      number: '56789-0',
      balance: 125000.00,
      group: 'operational',
      status: 'Ativa',
      lastMovement: '14/10/2025',
      manager: 'Roberto Santos',
      phone: '(11) 3003-0003'
    },
  ];

  const filteredAccounts = selectedGroup === 'all' 
    ? accounts 
    : accounts.filter(acc => acc.group === selectedGroup);

  const totalBalance = filteredAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Informações de Contas</h1>
        <p className="text-gray-600 mt-2">Visualize e gerencie todas as suas contas bancárias</p>
      </div>

      {/* Resumo Geral */}
      <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-blue-600" />
              Saldo Total
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-blue-900">
                {showBalance ? `R$ ${totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {filteredAccounts.length} {filteredAccounts.length === 1 ? 'conta' : 'contas'} {selectedGroup !== 'all' ? `no grupo "${accountGroups.find(g => g.id === selectedGroup)?.name}"` : 'no total'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Entradas (mês)</p>
                  <p className="font-bold text-green-600">R$ 125.000,00</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Saídas (mês)</p>
                  <p className="font-bold text-red-600">R$ 72.500,00</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Saldo médio</p>
                  <p className="font-bold text-blue-600">R$ 229.086,10</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrar por Grupo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {accountGroups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup === group.id ? 'default' : 'outline'}
                onClick={() => setSelectedGroup(group.id)}
                className={selectedGroup === group.id ? 'bg-blue-600' : ''}
              >
                {group.name} ({group.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contas */}
      <div className="space-y-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Wallet className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{account.type}</h3>
                      <p className="text-sm text-gray-600">
                        Agência {account.agency} • Conta {account.number}
                      </p>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {account.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-gray-500">Saldo Disponível</Label>
                      <p className="text-xl font-bold text-gray-900">
                        {showBalance ? `R$ ${account.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Último Movimento</Label>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {account.lastMovement}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Gerente</Label>
                      <p className="text-sm font-medium text-gray-700">{account.manager}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Telefone</Label>
                      <p className="text-sm font-medium text-gray-700">{account.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Extrato
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button size="sm" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma conta encontrada
            </h3>
            <p className="text-gray-600">
              Não há contas neste grupo. Selecione outro filtro.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

