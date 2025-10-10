import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Building,
  CheckSquare,
  Square,
  AlertCircle,
  Shield,
  CreditCard,
  Clock,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';

interface Boleto {
  id: string;
  favorecido: string;
  documento: string;
  valor: number;
  dataVencimento: string;
  codigoBarras: string;
  status: 'Disponível' | 'Vencido' | 'Pago';
  diasParaVencimento: number;
  descricao: string;
}

interface HistoricoPagamento {
  id: string;
  favorecido: string;
  valor: number;
  dataPagamento: string;
  dataVencimento: string;
  codigoBarras: string;
  comprovante: string;
}

export const PaymentsDDA: React.FC = () => {
  const [ddaAtivo, setDdaAtivo] = useState(true);
  const [selectedBoletos, setSelectedBoletos] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'boletos' | 'historico'>('boletos');
  
  // Filtros
  const [filterFavorecido, setFilterFavorecido] = useState('');
  const [filterValorMin, setFilterValorMin] = useState('');
  const [filterValorMax, setFilterValorMax] = useState('');
  const [filterDataInicio, setFilterDataInicio] = useState('');
  const [filterDataFim, setFilterDataFim] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const mockBoletos: Boleto[] = [
    {
      id: '1',
      favorecido: 'Energia Elétrica - CEMIG',
      documento: '17.155.730/0001-64',
      valor: 1245.80,
      dataVencimento: '15/10/2025',
      codigoBarras: '10491234500001245801234567890123456789012345',
      status: 'Disponível',
      diasParaVencimento: 5,
      descricao: 'Conta de energia - Unidade Centro - Ref: 09/2025'
    },
    {
      id: '2',
      favorecido: 'Telefonia - Vivo Empresas',
      documento: '02.558.157/0001-62',
      valor: 890.50,
      dataVencimento: '18/10/2025',
      codigoBarras: '10492345600000890501234567890123456789012345',
      status: 'Disponível',
      diasParaVencimento: 8,
      descricao: 'Telefonia fixa e móvel - Ref: 09/2025'
    },
    {
      id: '3',
      favorecido: 'Água e Esgoto - COPASA',
      documento: '17.281.106/0001-03',
      valor: 456.30,
      dataVencimento: '20/10/2025',
      codigoBarras: '10493456700000456301234567890123456789012345',
      status: 'Disponível',
      diasParaVencimento: 10,
      descricao: 'Água e esgoto - Todas as unidades - Ref: 09/2025'
    },
    {
      id: '4',
      favorecido: 'Internet - NET Empresarial',
      documento: '33.530.486/0001-29',
      valor: 680.00,
      dataVencimento: '22/10/2025',
      codigoBarras: '10494567800000680001234567890123456789012345',
      status: 'Disponível',
      diasParaVencimento: 12,
      descricao: 'Internet banda larga 500MB - Ref: 09/2025'
    },
    {
      id: '5',
      favorecido: 'Aluguel - Imobiliária XYZ',
      documento: '12.345.678/0001-90',
      valor: 12000.00,
      dataVencimento: '10/10/2025',
      codigoBarras: '10495678900012000001234567890123456789012345',
      status: 'Disponível',
      diasParaVencimento: 0,
      descricao: 'Aluguel - Imóvel comercial Centro - Ref: 10/2025'
    },
    {
      id: '6',
      favorecido: 'Condomínio - Edifício Empresarial',
      documento: '23.456.789/0001-01',
      valor: 3500.00,
      dataVencimento: '05/10/2025',
      codigoBarras: '10496789000003500001234567890123456789012345',
      status: 'Vencido',
      diasParaVencimento: -5,
      descricao: 'Condomínio - Unidade 1201 - Ref: 10/2025'
    },
  ];

  const mockHistorico: HistoricoPagamento[] = [
    {
      id: '1',
      favorecido: 'Energia Elétrica - CEMIG',
      valor: 1189.45,
      dataPagamento: '15/09/2025',
      dataVencimento: '15/09/2025',
      codigoBarras: '10491234500001189451234567890123456789012345',
      comprovante: 'COMP-2025-09-15-001'
    },
    {
      id: '2',
      favorecido: 'Telefonia - Vivo Empresas',
      valor: 875.30,
      dataPagamento: '18/09/2025',
      dataVencimento: '18/09/2025',
      codigoBarras: '10492345600000875301234567890123456789012345',
      comprovante: 'COMP-2025-09-18-002'
    },
    {
      id: '3',
      favorecido: 'Água e Esgoto - COPASA',
      valor: 442.80,
      dataPagamento: '20/09/2025',
      dataVencimento: '20/09/2025',
      codigoBarras: '10493456700000442801234567890123456789012345',
      comprovante: 'COMP-2025-09-20-003'
    },
    {
      id: '4',
      favorecido: 'Internet - NET Empresarial',
      valor: 680.00,
      dataPagamento: '22/09/2025',
      dataVencimento: '22/09/2025',
      codigoBarras: '10494567800000680001234567890123456789012345',
      comprovante: 'COMP-2025-09-22-004'
    },
    {
      id: '5',
      favorecido: 'Aluguel - Imobiliária XYZ',
      valor: 12000.00,
      dataPagamento: '10/09/2025',
      dataVencimento: '10/09/2025',
      codigoBarras: '10495678900012000001234567890123456789012345',
      comprovante: 'COMP-2025-09-10-005'
    },
  ];

  const [filteredBoletos, setFilteredBoletos] = useState(mockBoletos);
  const [filteredHistorico, setFilteredHistorico] = useState(mockHistorico);

  const handleFilter = () => {
    let filtered = mockBoletos;

    if (filterFavorecido) {
      filtered = filtered.filter(b => 
        b.favorecido.toLowerCase().includes(filterFavorecido.toLowerCase())
      );
    }
    if (filterValorMin) {
      filtered = filtered.filter(b => b.valor >= parseFloat(filterValorMin));
    }
    if (filterValorMax) {
      filtered = filtered.filter(b => b.valor <= parseFloat(filterValorMax));
    }
    if (filterStatus) {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    setFilteredBoletos(filtered);
  };

  const handleClearFilters = () => {
    setFilterFavorecido('');
    setFilterValorMin('');
    setFilterValorMax('');
    setFilterDataInicio('');
    setFilterDataFim('');
    setFilterStatus('');
    setFilteredBoletos(mockBoletos);
    setFilteredHistorico(mockHistorico);
  };

  const toggleBoletoSelection = (id: string) => {
    setSelectedBoletos(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const disponíveis = filteredBoletos.filter(b => b.status === 'Disponível');
    if (selectedBoletos.length === disponíveis.length) {
      setSelectedBoletos([]);
    } else {
      setSelectedBoletos(disponíveis.map(b => b.id));
    }
  };

  const handlePagarSelecionados = () => {
    if (selectedBoletos.length === 0) {
      alert('Selecione pelo menos um boleto para pagar.');
      return;
    }
    const total = filteredBoletos
      .filter(b => selectedBoletos.includes(b.id))
      .reduce((sum, b) => sum + b.valor, 0);
    
    alert(`Pagar ${selectedBoletos.length} boleto(s) selecionado(s)\n\nValor Total: R$ ${total.toFixed(2)}\n\nEm produção, isso abriria a tela de confirmação de pagamento.`);
  };

  const handlePagarIndividual = (boleto: Boleto) => {
    alert(`Pagar boleto:\n\nFavorecido: ${boleto.favorecido}\nValor: R$ ${boleto.valor.toFixed(2)}\nVencimento: ${boleto.dataVencimento}\n\nEm produção, isso abriria a tela de confirmação de pagamento.`);
  };

  const handleBaixarComprovante = (pagamento: HistoricoPagamento) => {
    alert(`Baixar comprovante:\n\nComprovante: ${pagamento.comprovante}\nFavorecido: ${pagamento.favorecido}\nValor: R$ ${pagamento.valor.toFixed(2)}\n\nEm produção, isso baixaria o PDF do comprovante.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Vencido':
        return 'bg-red-100 text-red-800';
      case 'Pago':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalBoletos = () => {
    return filteredBoletos
      .filter(b => b.status === 'Disponível')
      .reduce((sum, b) => sum + b.valor, 0);
  };

  const getBoletosVencidos = () => {
    return filteredBoletos.filter(b => b.status === 'Vencido').length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Acessar DDA</h2>
          <p className="text-gray-600 mt-2">
            Débito Direto Autorizado - Gerencie seus boletos automaticamente
          </p>
        </div>
      </div>

      {/* Status da Adesão DDA */}
      <Card className={ddaAtivo ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ddaAtivo ? 'bg-green-100' : 'bg-yellow-100'}`}>
                {ddaAtivo ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div>
                <h3 className={`font-semibold text-lg ${ddaAtivo ? 'text-green-900' : 'text-yellow-900'}`}>
                  {ddaAtivo ? 'DDA Ativo' : 'DDA Inativo'}
                </h3>
                <p className={`text-sm ${ddaAtivo ? 'text-green-700' : 'text-yellow-700'}`}>
                  {ddaAtivo 
                    ? 'Seus boletos são recebidos automaticamente' 
                    : 'Ative o DDA para receber boletos automaticamente'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {ddaAtivo ? (
                <>
                  <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Gerenciar Adesão
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDdaAtivo(false)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Desativar DDA
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm"
                  onClick={() => setDdaAtivo(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Ativar DDA
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('boletos')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'boletos'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="inline h-4 w-4 mr-2" />
          Boletos Disponíveis
        </button>
        <button
          onClick={() => setActiveTab('historico')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'historico'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="inline h-4 w-4 mr-2" />
          Histórico de Pagamentos
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'boletos' && (
        <>
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Total a Pagar</p>
                    <p className="text-2xl font-bold text-blue-900">
                      R$ {getTotalBoletos().toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <DollarSign className="h-10 w-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Boletos Disponíveis</p>
                    <p className="text-2xl font-bold text-green-900">
                      {filteredBoletos.filter(b => b.status === 'Disponível').length}
                    </p>
                  </div>
                  <FileText className="h-10 w-10 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700 font-medium">Boletos Vencidos</p>
                    <p className="text-2xl font-bold text-red-900">{getBoletosVencidos()}</p>
                  </div>
                  <AlertCircle className="h-10 w-10 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros de Pesquisa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="favorecido">
                      <Building className="inline h-4 w-4 mr-1" />
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
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                    >
                      <option value="">Todos</option>
                      <option value="Disponível">Disponível</option>
                      <option value="Vencido">Vencido</option>
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
          {selectedBoletos.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-900">
                    {selectedBoletos.length} boleto(s) selecionado(s) - Total: R${' '}
                    {filteredBoletos
                      .filter(b => selectedBoletos.includes(b.id))
                      .reduce((sum, b) => sum + b.valor, 0)
                      .toFixed(2)
                      .replace('.', ',')}
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handlePagarSelecionados} size="sm" className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pagar Selecionados
                    </Button>
                    <Button onClick={() => setSelectedBoletos([])} variant="outline" size="sm">
                      Limpar Seleção
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Boletos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Boletos Disponíveis</CardTitle>
                <Button
                  onClick={toggleSelectAll}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {selectedBoletos.length === filteredBoletos.filter(b => b.status === 'Disponível').length ? (
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
                {filteredBoletos.map((boleto) => {
                  const isSelected = selectedBoletos.includes(boleto.id);
                  const isDisponivel = boleto.status === 'Disponível';

                  return (
                    <div
                      key={boleto.id}
                      className={`border rounded-lg p-4 transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                      } ${!isDisponivel && 'opacity-60'}`}
                    >
                      <div className="flex items-center gap-4">
                        {isDisponivel && (
                          <button
                            onClick={() => toggleBoletoSelection(boleto.id)}
                            className="flex-shrink-0"
                          >
                            {isSelected ? (
                              <CheckSquare className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Square className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        )}

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-xs text-gray-500">Favorecido</p>
                            <p className="font-medium text-gray-900">{boleto.favorecido}</p>
                            <p className="text-xs text-gray-600">{boleto.descricao}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Vencimento</p>
                            <p className="font-medium text-gray-900">{boleto.dataVencimento}</p>
                            {boleto.diasParaVencimento >= 0 ? (
                              <p className="text-xs text-green-600">
                                {boleto.diasParaVencimento === 0 ? 'Vence hoje' : `${boleto.diasParaVencimento} dias`}
                              </p>
                            ) : (
                              <p className="text-xs text-red-600">
                                Vencido há {Math.abs(boleto.diasParaVencimento)} dias
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Valor</p>
                            <p className="font-bold text-lg text-gray-900">
                              R$ {boleto.valor.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(boleto.status)}`}>
                              {boleto.status}
                            </span>
                            {isDisponivel && (
                              <Button
                                onClick={() => handlePagarIndividual(boleto)}
                                size="sm"
                                className="mt-2 w-full bg-green-600 hover:bg-green-700"
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Pagar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Histórico de Pagamentos */}
      {activeTab === 'historico' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Histórico de Pagamentos DDA
              </CardTitle>
              <CardDescription>
                Consulte todos os pagamentos realizados via DDA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Data Início</Label>
                  <Input type="date" value={filterDataInicio} onChange={(e) => setFilterDataInicio(e.target.value)} />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input type="date" value={filterDataFim} onChange={(e) => setFilterDataFim(e.target.value)} />
                </div>
              </div>

              <Button className="w-full mb-6 bg-blue-900 hover:bg-blue-800">
                <Search className="mr-2 h-4 w-4" />
                Buscar Histórico
              </Button>

              <div className="space-y-3">
                {filteredHistorico.map((pagamento) => (
                  <div key={pagamento.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Favorecido</p>
                          <p className="font-medium text-gray-900">{pagamento.favorecido}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Data Pagamento</p>
                          <p className="font-medium text-gray-900">{pagamento.dataPagamento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Valor</p>
                          <p className="font-bold text-lg text-gray-900">
                            R$ {pagamento.valor.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-2">Comprovante</p>
                          <Button
                            onClick={() => handleBaixarComprovante(pagamento)}
                            size="sm"
                            variant="outline"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

