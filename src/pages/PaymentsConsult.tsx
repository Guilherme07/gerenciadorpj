import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search,
  Filter,
  Download,
  Repeat,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckSquare,
  Square,
  Printer,
  Calendar,
  DollarSign,
  User,
  CreditCard
} from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  favorecido: string;
  tipo: string;
  valor: number;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
  lote?: string;
  comprovante: string;
  detalhes: {
    banco: string;
    agencia: string;
    conta: string;
    documento: string;
    descricao: string;
    autenticacao: string;
  };
}

export const PaymentsConsult: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  
  // Filtros
  const [filterValorMin, setFilterValorMin] = useState('');
  const [filterValorMax, setFilterValorMax] = useState('');
  const [filterDataInicio, setFilterDataInicio] = useState('');
  const [filterDataFim, setFilterDataFim] = useState('');
  const [filterFavorecido, setFilterFavorecido] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  const mockPayments: Payment[] = [
    {
      id: '1',
      date: '08/10/2025',
      favorecido: 'Fornecedor ABC Ltda',
      tipo: 'TED',
      valor: 15000.00,
      status: 'Concluído',
      lote: 'LOTE-2025-001',
      comprovante: 'COMP-001-2025',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '1234',
        conta: '56789-0',
        documento: '12.345.678/0001-90',
        descricao: 'Pagamento de fornecedor - Nota Fiscal 12345',
        autenticacao: 'AUTH-2025-10-08-15000'
      }
    },
    {
      id: '2',
      date: '07/10/2025',
      favorecido: 'Energia Elétrica - CEMIG',
      tipo: 'Boleto',
      valor: 1245.80,
      status: 'Concluído',
      comprovante: 'COMP-002-2025',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '17.155.730/0001-64',
        descricao: 'Pagamento de conta de energia - Unidade Centro',
        autenticacao: 'AUTH-2025-10-07-1245'
      }
    },
    {
      id: '3',
      date: '06/10/2025',
      favorecido: 'João Silva',
      tipo: 'PIX',
      valor: 500.00,
      status: 'Concluído',
      comprovante: 'COMP-003-2025',
      detalhes: {
        banco: '001 - Banco do Brasil',
        agencia: '5678',
        conta: '12345-6',
        documento: '123.456.789-00',
        descricao: 'Reembolso de despesas',
        autenticacao: 'PIX-2025-10-06-500'
      }
    },
    {
      id: '4',
      date: '05/10/2025',
      favorecido: 'Folha de Pagamento - Outubro',
      tipo: 'Lote',
      valor: 85000.00,
      status: 'Concluído',
      lote: 'LOTE-2025-002',
      comprovante: 'COMP-004-2025',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: 'Múltiplas',
        conta: 'Múltiplas',
        documento: 'Múltiplos',
        descricao: 'Pagamento de folha - 45 funcionários',
        autenticacao: 'LOTE-2025-10-05-85000'
      }
    },
    {
      id: '5',
      date: '04/10/2025',
      favorecido: 'Telefonia - Vivo Empresas',
      tipo: 'Boleto',
      valor: 890.50,
      status: 'Concluído',
      comprovante: 'COMP-005-2025',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '02.558.157/0001-62',
        descricao: 'Pagamento de telefonia corporativa',
        autenticacao: 'AUTH-2025-10-04-890'
      }
    },
    {
      id: '6',
      date: '03/10/2025',
      favorecido: 'Tributo - DARF',
      tipo: 'Tributo',
      valor: 3500.00,
      status: 'Pendente',
      comprovante: 'COMP-006-2025',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '12.345.678/0001-90',
        descricao: 'DARF - Código 2089 - IRPJ',
        autenticacao: 'PEND-2025-10-03-3500'
      }
    },
  ];

  const [filteredPayments, setFilteredPayments] = useState(mockPayments);

  const handleFilter = () => {
    let filtered = mockPayments;

    if (filterValorMin) {
      filtered = filtered.filter(p => p.valor >= parseFloat(filterValorMin));
    }
    if (filterValorMax) {
      filtered = filtered.filter(p => p.valor <= parseFloat(filterValorMax));
    }
    if (filterFavorecido) {
      filtered = filtered.filter(p => 
        p.favorecido.toLowerCase().includes(filterFavorecido.toLowerCase())
      );
    }
    if (filterTipo) {
      filtered = filtered.filter(p => p.tipo === filterTipo);
    }

    setFilteredPayments(filtered);
  };

  const handleClearFilters = () => {
    setFilterValorMin('');
    setFilterValorMax('');
    setFilterDataInicio('');
    setFilterDataFim('');
    setFilterFavorecido('');
    setFilterTipo('');
    setFilteredPayments(mockPayments);
  };

  const togglePaymentSelection = (id: string) => {
    setSelectedPayments(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map(p => p.id));
    }
  };

  const handleDownloadComprovante = (payment: Payment) => {
    alert(`Baixando comprovante: ${payment.comprovante}\n\nEm produção, isso iniciaria o download do PDF do comprovante.`);
  };

  const handleConsultarLote = (lote: string) => {
    alert(`Consultando lote: ${lote}\n\nEm produção, isso abriria uma tela com todos os pagamentos do lote.`);
  };

  const handleRepetirTransacao = (payment: Payment) => {
    alert(`Repetir transação:\n\nFavorecido: ${payment.favorecido}\nValor: R$ ${payment.valor.toFixed(2)}\n\nEm produção, isso abriria o formulário de pagamento preenchido com os dados desta transação.`);
  };

  const handlePrintSelected = () => {
    if (selectedPayments.length === 0) {
      alert('Selecione pelo menos um pagamento para imprimir.');
      return;
    }
    alert(`Imprimindo ${selectedPayments.length} comprovante(s)...\n\nEm produção, isso geraria um PDF com todos os comprovantes selecionados.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Consultar Pagamentos</h2>
          <p className="text-gray-600 mt-2">
            Últimas transações realizadas - {filteredPayments.length} resultado(s)
          </p>
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </Button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Pesquisa
            </CardTitle>
            <CardDescription>
              Refine sua busca usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor-min">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Valor Mínimo
                </Label>
                <Input
                  id="valor-min"
                  type="number"
                  placeholder="0,00"
                  value={filterValorMin}
                  onChange={(e) => setFilterValorMin(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-max">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Valor Máximo
                </Label>
                <Input
                  id="valor-max"
                  type="number"
                  placeholder="0,00"
                  value={filterValorMax}
                  onChange={(e) => setFilterValorMax(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-inicio">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Data Início
                </Label>
                <Input
                  id="data-inicio"
                  type="date"
                  value={filterDataInicio}
                  onChange={(e) => setFilterDataInicio(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-fim">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Data Fim
                </Label>
                <Input
                  id="data-fim"
                  type="date"
                  value={filterDataFim}
                  onChange={(e) => setFilterDataFim(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favorecido">
                  <User className="inline h-4 w-4 mr-1" />
                  Favorecido
                </Label>
                <Input
                  id="favorecido"
                  type="text"
                  placeholder="Nome do favorecido"
                  value={filterFavorecido}
                  onChange={(e) => setFilterFavorecido(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Tipo de Pagamento
                </Label>
                <select
                  id="tipo"
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os tipos</option>
                  <option value="TED">TED</option>
                  <option value="DOC">DOC</option>
                  <option value="PIX">PIX</option>
                  <option value="Boleto">Boleto</option>
                  <option value="Tributo">Tributo</option>
                  <option value="Lote">Lote</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleFilter} className="flex-1 bg-blue-900 hover:bg-blue-800">
                <Search className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
              <Button onClick={handleClearFilters} variant="outline" className="flex-1">
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações em Lote */}
      {selectedPayments.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-blue-900">
                {selectedPayments.length} pagamento(s) selecionado(s)
              </p>
              <div className="flex gap-2">
                <Button onClick={handlePrintSelected} variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir Selecionados
                </Button>
                <Button onClick={() => setSelectedPayments([])} variant="outline" size="sm">
                  Limpar Seleção
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Pagamentos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Realizadas</CardTitle>
            <Button
              onClick={toggleSelectAll}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {selectedPayments.length === filteredPayments.length ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              Selecionar Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPayments.map((payment) => {
              const isExpanded = expandedPayment === payment.id;
              const isSelected = selectedPayments.includes(payment.id);

              return (
                <div
                  key={payment.id}
                  className={`border rounded-lg transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  {/* Resumo do Pagamento */}
                  <div className="p-4 flex items-center gap-4">
                    <button
                      onClick={() => togglePaymentSelection(payment.id)}
                      className="flex-shrink-0"
                    >
                      {isSelected ? (
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Data</p>
                        <p className="font-medium text-gray-900">{payment.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{payment.favorecido}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tipo</p>
                        <p className="font-medium text-gray-900">{payment.tipo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="font-bold text-lg text-gray-900">
                          R$ {payment.valor.toFixed(2).replace('.', ',')}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedPayment(isExpanded ? null : payment.id)}
                      className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Detalhes Expandidos */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-3">Detalhes do Pagamento</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Banco</p>
                          <p className="text-sm text-gray-900">{payment.detalhes.banco}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Agência / Conta</p>
                          <p className="text-sm text-gray-900">
                            {payment.detalhes.agencia} / {payment.detalhes.conta}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Documento</p>
                          <p className="text-sm text-gray-900">{payment.detalhes.documento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Autenticação</p>
                          <p className="text-sm text-gray-900 font-mono">{payment.detalhes.autenticacao}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500">Descrição</p>
                          <p className="text-sm text-gray-900">{payment.detalhes.descricao}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleDownloadComprovante(payment)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Baixar Comprovante
                        </Button>

                        {payment.lote && (
                          <Button
                            onClick={() => handleConsultarLote(payment.lote!)}
                            size="sm"
                            variant="outline"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Consultar Lote
                          </Button>
                        )}

                        <Button
                          onClick={() => handleRepetirTransacao(payment)}
                          size="sm"
                          variant="outline"
                        >
                          <Repeat className="mr-2 h-4 w-4" />
                          Repetir Transação
                        </Button>

                        <Button
                          onClick={() => handleDownloadComprovante(payment)}
                          size="sm"
                          variant="outline"
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Imprimir
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
