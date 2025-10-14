import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Zap,
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
  Shield,
  QrCode,
  Key
} from 'lucide-react';

interface PixAutomatico {
  id: string;
  favorecido: string;
  chavePix: string;
  tipoChave: 'CPF' | 'CNPJ' | 'Email' | 'Telefone' | 'Aleatória';
  categoria: string;
  valor: number;
  periodicidade: 'Mensal' | 'Quinzenal' | 'Semanal';
  diaRecorrencia: number;
  dataInicio: string;
  dataFim?: string;
  status: 'Ativo' | 'Suspenso' | 'Cancelado' | 'Pendente';
  limite: number;
  proximoPix: string;
  ultimoPix?: string;
  valorUltimoPix?: number;
  autorizacaoBacen: string;
}

interface HistoricoPix {
  id: string;
  favorecido: string;
  chavePix: string;
  valor: number;
  dataPix: string;
  status: 'Pago' | 'Falha';
  comprovante?: string;
  motivoFalha?: string;
  idTransacao: string;
}

export const PaymentsAutoPix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ativos' | 'historico' | 'futuros' | 'pendentes'>('ativos');
  const [showNovoPix, setShowNovoPix] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState<string | null>(null);

  const mockPixAtivos: PixAutomatico[] = [
    {
      id: '1',
      favorecido: 'Fornecedor ABC Ltda',
      chavePix: '12.345.678/0001-90',
      tipoChave: 'CNPJ',
      categoria: 'Fornecedores',
      valor: 5000.00,
      periodicidade: 'Mensal',
      diaRecorrencia: 10,
      dataInicio: '10/01/2025',
      status: 'Ativo',
      limite: 10000,
      proximoPix: '10/11/2025',
      ultimoPix: '10/10/2025',
      valorUltimoPix: 5000.00,
      autorizacaoBacen: 'AUTH-2025-001-BACEN'
    },
    {
      id: '2',
      favorecido: 'Prestador de Serviços XYZ',
      chavePix: 'contato@prestador.com.br',
      tipoChave: 'Email',
      categoria: 'Serviços',
      valor: 2500.00,
      periodicidade: 'Quinzenal',
      diaRecorrencia: 15,
      dataInicio: '15/09/2025',
      status: 'Ativo',
      limite: 5000,
      proximoPix: '15/11/2025',
      ultimoPix: '30/10/2025',
      valorUltimoPix: 2500.00,
      autorizacaoBacen: 'AUTH-2025-002-BACEN'
    },
    {
      id: '3',
      favorecido: 'Consultoria Empresarial',
      chavePix: '+5531987654321',
      tipoChave: 'Telefone',
      categoria: 'Consultoria',
      valor: 8000.00,
      periodicidade: 'Mensal',
      diaRecorrencia: 5,
      dataInicio: '05/08/2025',
      status: 'Suspenso',
      limite: 12000,
      proximoPix: '-',
      ultimoPix: '05/09/2025',
      valorUltimoPix: 8000.00,
      autorizacaoBacen: 'AUTH-2025-003-BACEN'
    },
  ];

  const mockPixPendentes: PixAutomatico[] = [
    {
      id: '4',
      favorecido: 'Novo Fornecedor Ltda',
      chavePix: '98.765.432/0001-10',
      tipoChave: 'CNPJ',
      categoria: 'Fornecedores',
      valor: 3000.00,
      periodicidade: 'Mensal',
      diaRecorrencia: 20,
      dataInicio: '20/11/2025',
      status: 'Pendente',
      limite: 5000,
      proximoPix: '20/11/2025',
      autorizacaoBacen: 'PENDING-2025-004-BACEN'
    },
  ];

  const mockHistorico: HistoricoPix[] = [
    {
      id: '1',
      favorecido: 'Fornecedor ABC Ltda',
      chavePix: '12.345.678/0001-90',
      valor: 5000.00,
      dataPix: '10/10/2025 14:35:22',
      status: 'Pago',
      comprovante: 'PIX-COMP-2025-10-10-001',
      idTransacao: 'E12345678202510101435220000000001'
    },
    {
      id: '2',
      favorecido: 'Prestador de Serviços XYZ',
      chavePix: 'contato@prestador.com.br',
      valor: 2500.00,
      dataPix: '30/10/2025 10:15:45',
      status: 'Pago',
      comprovante: 'PIX-COMP-2025-10-30-002',
      idTransacao: 'E12345678202510301015450000000002'
    },
    {
      id: '3',
      favorecido: 'Consultoria Empresarial',
      chavePix: '+5531987654321',
      valor: 8000.00,
      dataPix: '05/10/2025 16:20:10',
      status: 'Falha',
      motivoFalha: 'Limite diário excedido',
      idTransacao: 'E12345678202510051620100000000003'
    },
    {
      id: '4',
      favorecido: 'Fornecedor ABC Ltda',
      chavePix: '12.345.678/0001-90',
      valor: 5000.00,
      dataPix: '10/09/2025 14:30:15',
      status: 'Pago',
      comprovante: 'PIX-COMP-2025-09-10-004',
      idTransacao: 'E12345678202509101430150000000004'
    },
  ];

  const mockPixFuturos = mockPixAtivos
    .filter(p => p.status === 'Ativo')
    .map(p => ({
      ...p,
      dataPix: p.proximoPix,
      valorEstimado: p.valor
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

  const getTipoChaveIcon = (tipo: string) => {
    switch (tipo) {
      case 'CPF':
      case 'CNPJ':
        return <FileText className="h-4 w-4" />;
      case 'Email':
        return <FileText className="h-4 w-4" />;
      case 'Telefone':
        return <FileText className="h-4 w-4" />;
      case 'Aleatória':
        return <Key className="h-4 w-4" />;
      default:
        return <QrCode className="h-4 w-4" />;
    }
  };

  const handleSuspender = (id: string) => {
    alert(`Suspender PIX Automático ID: ${id}\n\nEm produção, isso suspenderia temporariamente o PIX recorrente.`);
  };

  const handleReativar = (id: string) => {
    alert(`Reativar PIX Automático ID: ${id}\n\nEm produção, isso reativaria o PIX suspenso.`);
  };

  const handleCancelar = (id: string) => {
    if (confirm('Tem certeza que deseja cancelar este PIX Automático?\n\nEsta ação não pode ser desfeita e requer nova autorização do BACEN para reativar.')) {
      alert(`PIX Automático ID: ${id} cancelado com sucesso!`);
    }
  };

  const handleEditar = (id: string) => {
    alert(`Editar PIX Automático ID: ${id}\n\nEm produção, isso abriria um formulário de edição.\n\nImportante: Alterações requerem nova autorização do BACEN.`);
  };

  const handleAprovar = (id: string) => {
    alert(`Aprovar cadastro pendente ID: ${id}\n\nEm produção, isso enviaria a solicitação para autorização do BACEN.`);
  };

  const handleRejeitar = (id: string) => {
    alert(`Rejeitar cadastro pendente ID: ${id}\n\nEm produção, isso cancelaria a solicitação.`);
  };

  const handleNovoPix = () => {
    alert('Incluir novo PIX Automático\n\nEm produção, isso abriria um formulário completo de cadastro.\n\nImportante: Requer autorização do BACEN (Resolução BCB nº 357/2024).');
    setShowNovoPix(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pagamentos via PIX Automático</h2>
          <p className="text-gray-600 mt-2">
            Gerencie seus PIX recorrentes autorizados pelo BACEN
          </p>
        </div>
        <Button
          onClick={() => setShowNovoPix(!showNovoPix)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo PIX Automático
        </Button>
      </div>

      {/* Alerta Regulamentação */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Regulamentação BACEN</h3>
              <p className="text-sm text-purple-800">
                O PIX Automático é regulamentado pela <strong>Resolução BCB nº 357/2024</strong>. 
                Todas as operações requerem autorização prévia do Banco Central e consentimento explícito do pagador.
                Você pode cancelar a qualquer momento sem ônus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">PIX Ativos</p>
                <p className="text-2xl font-bold text-green-900">
                  {mockPixAtivos.filter(p => p.status === 'Ativo').length}
                </p>
              </div>
              <Zap className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Suspensos</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {mockPixAtivos.filter(p => p.status === 'Suspenso').length}
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
                  {mockPixPendentes.length}
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
                <p className="text-sm text-purple-700 font-medium">Total Recorrente</p>
                <p className="text-2xl font-bold text-purple-900">
                  R$ {mockPixAtivos
                    .filter(p => p.status === 'Ativo')
                    .reduce((sum, p) => sum + p.valor, 0)
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
          <Zap className="inline h-4 w-4 mr-2" />
          PIX Contratados
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
          PIX Futuros
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
          {mockPixPendentes.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {mockPixPendentes.length}
            </span>
          )}
        </button>
      </div>

      {/* Formulário Novo PIX */}
      {showNovoPix && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Incluir Novo PIX Automático
            </CardTitle>
            <CardDescription>
              Preencha os dados para cadastrar um novo PIX recorrente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Favorecido</Label>
                <Input placeholder="Nome do favorecido" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Chave PIX</Label>
                <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm">
                  <option value="">Selecione...</option>
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave Aleatória</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Chave PIX</Label>
                <Input placeholder="Digite a chave PIX" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm">
                  <option value="">Selecione...</option>
                  <option value="fornecedores">Fornecedores</option>
                  <option value="servicos">Serviços</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Valor Fixo</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label>Periodicidade</Label>
                <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm">
                  <option value="mensal">Mensal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="semanal">Semanal</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Dia da Recorrência</Label>
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
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-900">Autorização BACEN</p>
                  <p className="text-sm text-purple-800">
                    Este cadastro será enviado para autorização do Banco Central conforme Resolução BCB nº 357/2024. 
                    O processo pode levar até 2 dias úteis. Você será notificado quando for aprovado.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleNovoPix} className="flex-1 bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Solicitar Autorização
              </Button>
              <Button onClick={() => setShowNovoPix(false)} variant="outline" className="flex-1">
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
            <CardTitle>PIX Automáticos Contratados</CardTitle>
            <CardDescription>
              Gerencie seus PIX recorrentes ativos e suspensos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPixAtivos.map((pix) => (
                <div key={pix.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{pix.favorecido}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(pix.status)}`}>
                          {pix.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getTipoChaveIcon(pix.tipoChave)}
                        <span>{pix.tipoChave}: {pix.chavePix}</span>
                      </div>
                      <p className="text-xs text-gray-500">Categoria: {pix.categoria}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Valor</p>
                      <p className="font-semibold text-gray-900">
                        R$ {pix.valor.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Periodicidade</p>
                      <p className="font-semibold text-gray-900">{pix.periodicidade}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Próximo PIX</p>
                      <p className="font-semibold text-gray-900">{pix.proximoPix}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Limite</p>
                      <p className="font-semibold text-gray-900">
                        R$ {pix.limite.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Autorização</p>
                      <p className="font-semibold text-xs text-gray-900">{pix.autorizacaoBacen}</p>
                    </div>
                  </div>

                  {showDetalhes === pix.id && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h5 className="font-semibold text-gray-900 mb-3">Informações Detalhadas</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Data de Início</p>
                          <p className="font-medium text-gray-900">{pix.dataInicio}</p>
                        </div>
                        {pix.dataFim && (
                          <div>
                            <p className="text-gray-500">Data de Fim</p>
                            <p className="font-medium text-gray-900">{pix.dataFim}</p>
                          </div>
                        )}
                        {pix.ultimoPix && (
                          <>
                            <div>
                              <p className="text-gray-500">Último PIX</p>
                              <p className="font-medium text-gray-900">{pix.ultimoPix}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Valor Último PIX</p>
                              <p className="font-medium text-gray-900">
                                R$ {pix.valorUltimoPix?.toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                          </>
                        )}
                        <div className="col-span-2">
                          <p className="text-gray-500">Autorização BACEN</p>
                          <p className="font-medium text-gray-900">{pix.autorizacaoBacen}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setShowDetalhes(showDetalhes === pix.id ? null : pix.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showDetalhes === pix.id ? 'Ocultar' : 'Ver'} Detalhes
                    </Button>
                    <Button
                      onClick={() => handleEditar(pix.id)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    {pix.status === 'Ativo' ? (
                      <Button
                        onClick={() => handleSuspender(pix.id)}
                        size="sm"
                        variant="outline"
                        className="border-yellow-300 text-yellow-700"
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Suspender
                      </Button>
                    ) : pix.status === 'Suspenso' ? (
                      <Button
                        onClick={() => handleReativar(pix.id)}
                        size="sm"
                        variant="outline"
                        className="border-green-300 text-green-700"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Reativar
                      </Button>
                    ) : null}
                    <Button
                      onClick={() => handleCancelar(pix.id)}
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
            <CardTitle>PIX Futuros Programados</CardTitle>
            <CardDescription>
              Visualize os próximos PIX automáticos programados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPixFuturos.map((pix) => (
                <div key={pix.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{pix.favorecido}</p>
                        <p className="text-xs text-gray-600">{pix.chavePix}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data do PIX</p>
                        <p className="font-medium text-gray-900">{pix.dataPix}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="font-bold text-lg text-gray-900">
                          R$ {pix.valorEstimado.toFixed(2).replace('.', ',')}
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
            <CardTitle>Histórico de PIX Automáticos</CardTitle>
            <CardDescription>
              Consulte todos os PIX recorrentes já realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockHistorico.map((pix) => (
                <div key={pix.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Favorecido</p>
                        <p className="font-medium text-gray-900">{pix.favorecido}</p>
                        <p className="text-xs text-gray-600">{pix.chavePix}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data/Hora</p>
                        <p className="font-medium text-gray-900">{pix.dataPix}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valor</p>
                        <p className="font-bold text-lg text-gray-900">
                          R$ {pix.valor.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">ID Transação</p>
                        <p className="font-mono text-xs text-gray-900">{pix.idTransacao}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded mb-2 ${getStatusColor(pix.status)}`}>
                          {pix.status}
                        </span>
                        {pix.status === 'Pago' && pix.comprovante && (
                          <Button size="sm" variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            Comprovante
                          </Button>
                        )}
                        {pix.status === 'Falha' && pix.motivoFalha && (
                          <p className="text-xs text-red-600 mt-1">{pix.motivoFalha}</p>
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
              Cadastros Pendentes de Autorização BACEN
            </CardTitle>
            <CardDescription>
              Aguardando autorização do Banco Central para ativação
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockPixPendentes.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum cadastro pendente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockPixPendentes.map((pix) => (
                  <div key={pix.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{pix.favorecido}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          {getTipoChaveIcon(pix.tipoChave)}
                          <span>{pix.tipoChave}: {pix.chavePix}</span>
                        </div>
                        <p className="text-xs text-gray-500">Categoria: {pix.categoria}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(pix.status)}`}>
                        {pix.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500">Valor</p>
                        <p className="font-semibold text-gray-900">
                          R$ {pix.valor.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Periodicidade</p>
                        <p className="font-semibold text-gray-900">{pix.periodicidade}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Início</p>
                        <p className="font-semibold text-gray-900">{pix.dataInicio}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Limite</p>
                        <p className="font-semibold text-gray-900">
                          R$ {pix.limite.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <p className="text-sm text-purple-800">
                          Protocolo BACEN: <strong>{pix.autorizacaoBacen}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditar(pix.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleRejeitar(pix.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-300 text-red-700"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancelar Solicitação
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
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informações sobre PIX Automático
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-purple-900">
            <p>
              <strong>PIX Automático (Resolução BCB nº 357/2024):</strong> Permite pagamentos recorrentes via PIX com autorização prévia.
            </p>
            <p>
              <strong>Autorização BACEN:</strong> Todos os cadastros requerem autorização do Banco Central (até 2 dias úteis).
            </p>
            <p>
              <strong>Limite:</strong> Define o valor máximo que pode ser debitado. Valores acima serão recusados automaticamente.
            </p>
            <p>
              <strong>Periodicidade:</strong> Você pode configurar pagamentos mensais, quinzenais ou semanais.
            </p>
            <p>
              <strong>Suspensão:</strong> Você pode suspender temporariamente um PIX Automático sem cancelá-lo.
            </p>
            <p>
              <strong>Cancelamento:</strong> O cancelamento é definitivo e requer nova autorização BACEN para reativar.
            </p>
            <p>
              <strong>Segurança:</strong> Todas as transações são protegidas pelos protocolos de segurança do PIX e monitoradas pelo BACEN.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

