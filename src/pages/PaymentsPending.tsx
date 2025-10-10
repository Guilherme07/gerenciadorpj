import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
  CreditCard,
  Users,
  Clock
} from 'lucide-react';

interface PendingPayment {
  id: string;
  date: string;
  favorecido: string;
  tipo: string;
  valor: number;
  status: 'Aguardando aprovação' | 'Em processamento' | 'Aguardando autorização';
  iniciadoPor: string;
  isLote: boolean;
  qtdTransacoes?: number;
  motivoPendencia: string;
  detalhes: {
    banco: string;
    agencia: string;
    conta: string;
    documento: string;
    descricao: string;
    dataInicio: string;
    prazoLimite: string;
  };
}

export const PaymentsPending: React.FC = () => {
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
  const [filterIniciadoPor, setFilterIniciadoPor] = useState('');

  const mockPendingPayments: PendingPayment[] = [
    {
      id: '1',
      date: '10/10/2025',
      favorecido: 'Fornecedor XYZ Ltda',
      tipo: 'TED',
      valor: 25000.00,
      status: 'Aguardando aprovação',
      iniciadoPor: 'Maria Santos (Financeiro)',
      isLote: false,
      motivoPendencia: 'Aguardando aprovação do gestor',
      detalhes: {
        banco: '001 - Banco do Brasil',
        agencia: '3456',
        conta: '78901-2',
        documento: '23.456.789/0001-01',
        descricao: 'Pagamento de fornecedor - NF 98765',
        dataInicio: '10/10/2025 14:30',
        prazoLimite: '12/10/2025 18:00'
      }
    },
    {
      id: '2',
      date: '09/10/2025',
      favorecido: 'Lote de Pagamentos - Fornecedores',
      tipo: 'Lote',
      valor: 150000.00,
      status: 'Aguardando autorização',
      iniciadoPor: 'João Silva (Você)',
      isLote: true,
      qtdTransacoes: 25,
      motivoPendencia: 'Aguardando token de autorização',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: 'Múltiplas',
        conta: 'Múltiplas',
        documento: 'Múltiplos',
        descricao: 'Lote de pagamento a fornecedores - 25 transações',
        dataInicio: '09/10/2025 16:45',
        prazoLimite: '11/10/2025 17:00'
      }
    },
    {
      id: '3',
      date: '09/10/2025',
      favorecido: 'Tributo Federal - DARF',
      tipo: 'Tributo',
      valor: 8500.00,
      status: 'Em processamento',
      iniciadoPor: 'Carlos Oliveira (Contabilidade)',
      isLote: false,
      motivoPendencia: 'Processamento bancário em andamento',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '12.345.678/0001-90',
        descricao: 'DARF - Código 2089 - IRPJ - Período 09/2025',
        dataInicio: '09/10/2025 10:15',
        prazoLimite: '10/10/2025 23:59'
      }
    },
    {
      id: '4',
      date: '08/10/2025',
      favorecido: 'Folha de Pagamento - Outubro',
      tipo: 'Lote',
      valor: 95000.00,
      status: 'Aguardando aprovação',
      iniciadoPor: 'Ana Paula (RH)',
      isLote: true,
      qtdTransacoes: 52,
      motivoPendencia: 'Aguardando dupla aprovação (Financeiro + Diretoria)',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: 'Múltiplas',
        conta: 'Múltiplas',
        documento: 'Múltiplos',
        descricao: 'Folha de pagamento - 52 funcionários - Outubro/2025',
        dataInicio: '08/10/2025 09:00',
        prazoLimite: '15/10/2025 12:00'
      }
    },
    {
      id: '5',
      date: '08/10/2025',
      favorecido: 'Aluguel - Imóvel Comercial',
      tipo: 'Boleto',
      valor: 12000.00,
      status: 'Aguardando aprovação',
      iniciadoPor: 'João Silva (Você)',
      isLote: false,
      motivoPendencia: 'Aguardando confirmação de dados',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '34.567.890/0001-23',
        descricao: 'Aluguel - Outubro/2025 - Unidade Centro',
        dataInicio: '08/10/2025 11:20',
        prazoLimite: '10/10/2025 18:00'
      }
    },
    {
      id: '6',
      date: '07/10/2025',
      favorecido: 'Energia Elétrica - CEMIG',
      tipo: 'Boleto',
      valor: 3245.80,
      status: 'Aguardando autorização',
      iniciadoPor: 'Pedro Costa (Administrativo)',
      isLote: false,
      motivoPendencia: 'Valor acima do limite - Requer autorização superior',
      detalhes: {
        banco: '104 - Caixa Econômica Federal',
        agencia: '-',
        conta: '-',
        documento: '17.155.730/0001-64',
        descricao: 'Conta de energia - Todas as unidades - Setembro/2025',
        dataInicio: '07/10/2025 15:30',
        prazoLimite: '12/10/2025 23:59'
      }
    },
  ];

  const [filteredPayments, setFilteredPayments] = useState(mockPendingPayments);

  const handleFilter = () => {
    let filtered = mockPendingPayments;

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
    if (filterIniciadoPor) {
      filtered = filtered.filter(p => 
        p.iniciadoPor.toLowerCase().includes(filterIniciadoPor.toLowerCase())
      );
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
    setFilterIniciadoPor('');
    setFilteredPayments(mockPendingPayments);
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

  const handleConcluir = (payment: PendingPayment) => {
    alert(`Concluir pagamento:\n\nFavorecido: ${payment.favorecido}\nValor: R$ ${payment.valor.toFixed(2)}\n\nEm produção, isso processaria o pagamento e moveria para "Concluídos".`);
  };

  const handleCancelar = (payment: PendingPayment) => {
    alert(`Cancelar pagamento:\n\nFavorecido: ${payment.favorecido}\nValor: R$ ${payment.valor.toFixed(2)}\n\nEm produção, isso cancelaria o pagamento pendente.`);
  };

  const handleEditar = (payment: PendingPayment) => {
    alert(`Editar pagamento:\n\nFavorecido: ${payment.favorecido}\nValor: R$ ${payment.valor.toFixed(2)}\n\nEm produção, isso abriria o formulário de edição com os dados atuais.`);
  };

  const handleConcluirSelecionados = () => {
    if (selectedPayments.length === 0) {
      alert('Selecione pelo menos um pagamento para concluir.');
      return;
    }
    alert(`Concluir ${selectedPayments.length} pagamento(s) selecionado(s)...\n\nEm produção, isso processaria todos os pagamentos selecionados em lote.`);
  };

  const handleCancelarSelecionados = () => {
    if (selectedPayments.length === 0) {
      alert('Selecione pelo menos um pagamento para cancelar.');
      return;
    }
    alert(`Cancelar ${selectedPayments.length} pagamento(s) selecionado(s)...\n\nEm produção, isso cancelaria todos os pagamentos selecionados.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando aprovação':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em processamento':
        return 'bg-blue-100 text-blue-800';
      case 'Aguardando autorização':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalPendente = () => {
    return filteredPayments.reduce((sum, p) => sum + p.valor, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pagamentos Pendentes</h2>
          <p className="text-gray-600 mt-2">
            {filteredPayments.length} transação(ões) aguardando conclusão
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

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Total Pendente</p>
                <p className="text-2xl font-bold text-yellow-900">
                  R$ {getTotalPendente().toFixed(2).replace('.', ',')}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Transações</p>
                <p className="text-2xl font-bold text-blue-900">{filteredPayments.length}</p>
              </div>
              <CreditCard className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Lotes Pendentes</p>
                <p className="text-2xl font-bold text-purple-900">
                  {filteredPayments.filter(p => p.isLote).length}
                </p>
              </div>
              <Users className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="iniciado-por">
                  <User className="inline h-4 w-4 mr-1" />
                  Iniciado Por
                </Label>
                <Input
                  id="iniciado-por"
                  type="text"
                  placeholder="Nome do usuário"
                  value={filterIniciadoPor}
                  onChange={(e) => setFilterIniciadoPor(e.target.value)}
                />
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
                <Button onClick={handleConcluirSelecionados} size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Concluir Selecionados
                </Button>
                <Button onClick={handleCancelarSelecionados} size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancelar Selecionados
                </Button>
                <Button onClick={() => setSelectedPayments([])} variant="outline" size="sm">
                  Limpar Seleção
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Pagamentos Pendentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Pendentes</CardTitle>
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

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Data</p>
                        <p className="font-medium text-gray-900">{payment.date}</p>
                        {payment.isLote && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                            Lote ({payment.qtdTransacoes})
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{payment.favorecido}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tipo</p>
                        <p className="font-medium text-gray-900">{payment.tipo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Iniciado Por</p>
                        <p className="font-medium text-gray-900 text-sm">{payment.iniciadoPor}</p>
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
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-900">Motivo da Pendência:</p>
                            <p className="text-sm text-yellow-800">{payment.motivoPendencia}</p>
                          </div>
                        </div>
                      </div>

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
                          <p className="text-xs text-gray-500">Data de Início</p>
                          <p className="text-sm text-gray-900">{payment.detalhes.dataInicio}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Prazo Limite</p>
                          <p className="text-sm text-gray-900 font-medium flex items-center gap-1">
                            <Clock className="h-4 w-4 text-orange-600" />
                            {payment.detalhes.prazoLimite}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500">Descrição</p>
                          <p className="text-sm text-gray-900">{payment.detalhes.descricao}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => handleConcluir(payment)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Concluir Pagamento
                        </Button>

                        <Button
                          onClick={() => handleEditar(payment)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>

                        <Button
                          onClick={() => handleCancelar(payment)}
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancelar
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
