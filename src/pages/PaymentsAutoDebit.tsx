import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard,
  Calendar,
  DollarSign,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Edit,
  Trash2,
  Pause,
  Play,
  Plus,
  Eye,
  FileText,
  TrendingUp,
  Shield,
  Search,
  Filter
} from 'lucide-react';

interface DebitoAutomatico {
  id: string;
  favorecido: string;
  documento: string;
  categoria: string;
  valor: number;
  diaVencimento: number;
  dataInicio: string;
  dataFim?: string;
  status: 'Ativo' | 'Suspenso' | 'Cancelado' | 'Pendente';
  limite: number;
  usaChequeEspecial: boolean;
  proximoDebito: string;
  ultimoDebito?: string;
  valorUltimoDebito?: number;
}

interface HistoricoDebito {
  id: string;
  favorecido: string;
  valor: number;
  dataDebito: string;
  status: 'Pago' | 'Falha';
  comprovante?: string;
  motivoFalha?: string;
}

export const PaymentsAutoDebit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ativos' | 'historico' | 'futuros' | 'pendentes'>('ativos');
  const [showNovoDebito, setShowNovoDebito] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filtros
  const [filterFavorecido, setFilterFavorecido] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const mockDebitosAtivos: DebitoAutomatico[] = [
    {
      id: '1',
      favorecido: 'Energia Elétrica - CEMIG',
      documento: '17.155.730/0001-64',
      categoria: 'Utilidades',
      valor: 0, // Valor variável
      diaVencimento: 15,
      dataInicio: '15/01/2024',
      status: 'Ativo',
      limite: 5000,
      usaChequeEspecial: false,
      proximoDebito: '15/11/2025',
      ultimoDebito: '15/10/2025',
      valorUltimoDebito: 1245.80
    },
    {
      id: '2',
      favorecido: 'Telefonia - Vivo Empresas',
      documento: '02.558.157/0001-62',
      categoria: 'Telecomunicações',
      valor: 890.50,
      diaVencimento: 18,
      dataInicio: '18/03/2024',
      status: 'Ativo',
      limite: 2000,
      usaChequeEspecial: true,
      proximoDebito: '18/11/2025',
      ultimoDebito: '18/10/2025',
      valorUltimoDebito: 890.50
    },
    {
      id: '3',
      favorecido: 'Aluguel - Imobiliária XYZ',
      documento: '12.345.678/0001-90',
      categoria: 'Aluguel',
      valor: 12000.00,
      diaVencimento: 10,
      dataInicio: '10/01/2023',
      status: 'Ativo',
      limite: 15000,
      usaChequeEspecial: false,
      proximoDebito: '10/11/2025',
      ultimoDebito: '10/10/2025',
      valorUltimoDebito: 12000.00
    },
    {
      id: '4',
      favorecido: 'Condomínio - Edifício Empresarial',
      documento: '23.456.789/0001-01',
      categoria: 'Condomínio',
      valor: 3500.00,
      diaVencimento: 5,
      dataInicio: '05/06/2024',
      status: 'Suspenso',
      limite: 5000,
      usaChequeEspecial: false,
      proximoDebito: '-',
      ultimoDebito: '05/09/2025',
      valorUltimoDebito: 3500.00
    },
  ];

  const mockDebitosPendentes: DebitoAutomatico[] = [
    {
      id: '5',
      favorecido: 'Internet - NET Empresarial',
      documento: '33.530.486/0001-29',
      categoria: 'Telecomunicações',
      valor: 680.00,
      diaVencimento: 22,
      dataInicio: '22/11/2025',
      status: 'Pendente',
      limite: 1000,
      usaChequeEspecial: false,
      proximoDebito: '22/11/2025'
    },
    {
      id: '6',
      favorecido: 'Água e Esgoto - COPASA',
      documento: '17.281.106/0001-03',
      categoria: 'Utilidades',
      valor: 0,
      diaVencimento: 20,
      dataInicio: '20/11/2025',
      status: 'Pendente',
      limite: 2000,
      usaChequeEspecial: false,
      proximoDebito: '20/11/2025'
    },
  ];

  const mockHistorico: HistoricoDebito[] = [
    {
      id: '1',
      favorecido: 'Energia Elétrica - CEMIG',
      valor: 1245.80,
      dataDebito: '15/10/2025',
      status: 'Pago',
      comprovante: 'COMP-2025-10-15-001'
    },
    {
      id: '2',
      favorecido: 'Telefonia - Vivo Empresas',
      valor: 890.50,
      dataDebito: '18/10/2025',
      status: 'Pago',
      comprovante: 'COMP-2025-10-18-002'
    },
    {
      id: '3',
      favorecido: 'Aluguel - Imobiliária XYZ',
      valor: 12000.00,
      dataDebito: '10/10/2025',
      status: 'Pago',
      comprovante: 'COMP-2025-10-10-003'
    },
    {
      id: '4',
      favorecido: 'Condomínio - Edifício Empresarial',
      valor: 3500.00,
      dataDebito: '05/10/2025',
      status: 'Falha',
      motivoFalha: 'Saldo insuficiente'
    },
    {
      id: '5',
      favorecido: 'Energia Elétrica - CEMIG',
      valor: 1189.45,
      dataDebito: '15/09/2025',
      status: 'Pago',
      comprovante: 'COMP-2025-09-15-004'
    },
  ];

  const mockDebitosFuturos = mockDebitosAtivos
    .filter(d => d.status === 'Ativo')
    .map(d => ({
      ...d,
      dataDebito: d.proximoDebito,
      valorEstimado: d.valor || d.valorUltimoDebito || 0
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Suspenso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Pendente':
        return 'bg-blue-100 text-blue-800';
      case 'Pago':
        return 'bg-green-100 text-green-800';
      case 'Falha':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSuspender = (id: string) => {
    alert(`Suspender débito automático ID: ${id}\n\nEm produção, isso suspenderia temporariamente o débito.`);
  };

  const handleReativar = (id: string) => {
    alert(`Reativar débito automático ID: ${id}\n\nEm produção, isso reativaria o débito suspenso.`);
  };

  const handleCancelar = (id: string) => {
    if (confirm('Tem certeza que deseja cancelar este débito automático?\n\nEsta ação não pode ser desfeita.')) {
      alert(`Débito automático ID: ${id} cancelado com sucesso!`);
    }
  };

  const handleEditar = (id: string) => {
    alert(`Editar débito automático ID: ${id}\n\nEm produção, isso abriria um formulário de edição.`);
  };

  const handleAprovar = (id: string) => {
    alert(`Aprovar cadastro pendente ID: ${id}\n\nEm produção, isso ativaria o débito automático.`);
  };

  const handleRejeitar = (id: string) => {
    alert(`Rejeitar cadastro pendente ID: ${id}\n\nEm produção, isso cancelaria a solicitação.`);
  };

  const handleNovoDebito = () => {
    alert('Incluir novo débito automático\n\nEm produção, isso abriria um formulário completo de cadastro.');
    setShowNovoDebito(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pagamentos via Débito Automático</h2>
          <p className="text-gray-600 mt-2">
            Gerencie seus débitos automáticos contratados
          </p>
        </div>
        <Button
          onClick={() => setShowNovoDebito(!showNovoDebito)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Débito Automático
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Débitos Ativos</p>
                <p className="text-2xl font-bold text-green-900">
                  {mockDebitosAtivos.filter(d => d.status === 'Ativo').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Suspensos</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {mockDebitosAtivos.filter(d => d.status === 'Suspenso').length}
                </p>
              </div>
              <Pause className="h-10 w-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Pendentes</p>
                <p className="text-2xl font-bold text-blue-900">
                  {mockDebitosPendentes.length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Total Mensal Est.</p>
                <p className="text-2xl font-bold text-purple-900">
                  R$ {mockDebitosAtivos
                    .filter(d => d.status === 'Ativo')
                    .reduce((sum, d) => sum + (d.valor || d.valorUltimoDebito || 0), 0)
                    .toFixed(2)
                    .replace('.', ',')}
                </p>
              </div>
              <DollarSign className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('ativos')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'ativos'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CreditCard className="inline h-4 w-4 mr-2" />
          Débitos Contratados
        </button>
        <button
          onClick={() => setActiveTab('futuros')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'futuros'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Calendar className="inline h-4 w-4 mr-2" />
          Débitos Futuros
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
          Histórico
        </button>
        <button
          onClick={() => setActiveTab('pendentes')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'pendentes'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertCircle className="inline h-4 w-4 mr-2" />
          Cadastros Pendentes
          {mockDebitosPendentes.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {mockDebitosPendentes.length}
            </span>
          )}
        </button>
      </div>

      {/* Formulário Novo Débito */}
      {showNovoDebito && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Incluir Novo Débito Automático
            </CardTitle>
            <CardDescription>
              Preencha os dados para cadastrar um novo débito automático
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Favorecido</Label>
                <Input placeholder="Nome do favorecido" />
              </div>
              <div className="space-y-2">
                <Label>CNPJ/CPF</Label>
                <Input placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm">
                  <option value="">Selecione...</option>
                  <option value="utilidades">Utilidades</option>
                  <option value="telecomunicacoes">Telecomunicações</option>
                  <option value="aluguel">Aluguel</option>
                  <option value="condominio">Condomínio</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Valor Fixo (opcional)</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label>Dia do Vencimento</Label>
                <Input type="number" min="1" max="31" placeholder="1-31" />
              </div>
              <div className="space-y-2">
                <Label>Data de Início</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Limite Máximo</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label>Validade (opcional)</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="cheque-especial" className="w-4 h-4" />
                  <Label htmlFor="cheque-especial" className="cursor-pointer">
                    Permitir uso de cheque especial
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900">Importante</p>
                  <p className="text-sm text-yellow-800">
                    O cadastro ficará pendente de aprovação. Você receberá uma notificação quando for aprovado.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleNovoDebito} className="flex-1 bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar Débito
              </Button>
              <Button onClick={() => setShowNovoDebito(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conteúdo das Tabs */}
      {activeTab === 'ativos' && (
        <Card>
          <CardHeader>
            <CardTitle>Débitos Automáticos Contratados</CardTitle>
            <CardDescription>
              Gerencie seus débitos automáticos ativos e suspensos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDebitosAtivos.map((debito) => (
                <div key={debito.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{debito.favorecido}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(debito.status)}`}>
                          {debito.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{debito.documento}</p>
                      <p className="text-xs text-gray-500">Categoria: {debito.categoria}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Valor</p>
                      <p className="font-semibold text-gray-900">
                        {debito.valor > 0 
                          ? `R$ ${debito.valor.toFixed(2).replace('.', ',')}` 
                          : 'Variável'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Dia Vencimento</p>
                      <p className="font-semibold text-gray-900">Dia {debito.diaVencimento}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Próximo Débito</p>
                      <p className="font-semibold text-gray-900">{debito.proximoDebito}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Limite</p>
                      <p className="font-semibold text-gray-900">
                        R$ {debito.limite.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cheque Especial</p>
                      <p className="font-semibold text-gray-900">
                        {debito.usaChequeEspecial ? 'Sim' : 'Não'}
                      </p>
                    </div>
                  </div>

                  {showDetalhes === debito.id && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h5 className="font-semibold text-gray-900 mb-3">Informações Detalhadas</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Data de Início</p>
                          <p className="font-medium text-gray-900">{debito.dataInicio}</p>
                        </div>
                        {debito.dataFim && (
                          <div>
                            <p className="text-gray-500">Data de Fim</p>
                            <p className="font-medium text-gray-900">{debito.dataFim}</p>
                          </div>
                        )}
                        {debito.ultimoDebito && (
                          <>
                            <div>
                              <p className="text-gray-500">Último Débito</p>
                              <p className="font-medium text-gray-900">{debito.ultimoDebito}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Valor Último Débito</p>
                              <p className="font-medium text-gray-900">
                                R$ {debito.valorUltimoDebito?.toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setShowDetalhes(showDetalhes === debito.id ? null : debito.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showDetalhes === debito.id ? 'Ocultar' : 'Ver'} Detalhes
                    </Button>
                    <Button
                      onClick={() => handleEditar(debito.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    {debito.status === 'Ativo' ? (
                      <Button
                        onClick={() => handleSuspender(debito.id)}
                        size="sm"
                        variant="outline"
                        className="border-yellow-300 text-yellow-700"
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Suspender
                      </Button>
                    ) : debito.status === 'Suspenso' ? (
                      <Button
                        onClick={() => handleReativar(debito.id)}
                        size="sm"
                        variant="outline"
                        className="border-green-300 text-green-700"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Reativar
                      </Button>
                    ) : null}
                    <Button
                      onClick={() => handleCancelar(debito.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'futuros' && (
        <Card>
          <CardHeader>
            <CardTitle>Débitos Futuros Cadastrados</CardTitle>
            <CardDescription>
              Visualize os próximos débitos automáticos programados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDebitosFuturos.map((debito) => (
                <div key={debito.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{debito.favorecido}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data do Débito</p>
                        <p className="font-medium text-gray-900">{debito.dataDebito}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valor Estimado</p>
                        <p className="font-bold text-lg text-gray-900">
                          R$ {debito.valorEstimado.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          Programado
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'historico' && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Débitos</CardTitle>
            <CardDescription>
              Consulte todos os débitos automáticos já realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockHistorico.map((debito) => (
                <div key={debito.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{debito.favorecido}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data do Débito</p>
                        <p className="font-medium text-gray-900">{debito.dataDebito}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="font-bold text-lg text-gray-900">
                          R$ {debito.valor.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded mb-2 ${getStatusColor(debito.status)}`}>
                          {debito.status}
                        </span>
                        {debito.status === 'Pago' && debito.comprovante && (
                          <Button size="sm" variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            Comprovante
                          </Button>
                        )}
                        {debito.status === 'Falha' && debito.motivoFalha && (
                          <p className="text-xs text-red-600 mt-1">{debito.motivoFalha}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'pendentes' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Cadastros Pendentes de Aprovação
            </CardTitle>
            <CardDescription>
              Aprove ou rejeite as solicitações de débito automático
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockDebitosPendentes.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum cadastro pendente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockDebitosPendentes.map((debito) => (
                  <div key={debito.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{debito.favorecido}</h4>
                        <p className="text-sm text-gray-600">{debito.documento}</p>
                        <p className="text-xs text-gray-500">Categoria: {debito.categoria}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(debito.status)}`}>
                        {debito.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Valor</p>
                        <p className="font-semibold text-gray-900">
                          {debito.valor > 0 
                            ? `R$ ${debito.valor.toFixed(2).replace('.', ',')}` 
                            : 'Variável'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Dia Vencimento</p>
                        <p className="font-semibold text-gray-900">Dia {debito.diaVencimento}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Início</p>
                        <p className="font-semibold text-gray-900">{debito.dataInicio}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Limite</p>
                        <p className="font-semibold text-gray-900">
                          R$ {debito.limite.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAprovar(debito.id)}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aprovar
                      </Button>
                      <Button
                        onClick={() => handleEditar(debito.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleRejeitar(debito.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-300 text-red-700"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Informações Importantes */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-900">
            <p>
              <strong>Débito Automático:</strong> Os valores serão debitados automaticamente da sua conta na data de vencimento.
            </p>
            <p>
              <strong>Limite:</strong> Define o valor máximo que pode ser debitado. Valores acima serão recusados.
            </p>
            <p>
              <strong>Cheque Especial:</strong> Se habilitado, permite débito mesmo com saldo insuficiente (sujeito a taxas).
            </p>
            <p>
              <strong>Suspensão:</strong> Você pode suspender temporariamente um débito automático sem cancelá-lo.
            </p>
            <p>
              <strong>Cancelamento:</strong> O cancelamento é definitivo e requer novo cadastro para reativar.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

