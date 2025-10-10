import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  CreditCard,
  Shield,
  FileText,
  Clock,
  Edit,
  Send
} from 'lucide-react';

interface Limite {
  id: string;
  tipo: string;
  limiteTotal: number;
  limiteDisponivel: number;
  limiteConsumido: number;
  percentualConsumido: number;
  periodo: string;
}

export const PaymentsLimits: React.FC = () => {
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const [tipoSolicitacao, setTipoSolicitacao] = useState<'aumento' | 'reducao'>('aumento');
  const [limitesSelecionado, setLimitesSelecionado] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [justificativa, setJustificativa] = useState('');

  const mockLimites: Limite[] = [
    {
      id: '1',
      tipo: 'TED/DOC',
      limiteTotal: 500000,
      limiteDisponivel: 325000,
      limiteConsumido: 175000,
      percentualConsumido: 35,
      periodo: 'Diário'
    },
    {
      id: '2',
      tipo: 'PIX',
      limiteTotal: 1000000,
      limiteDisponivel: 450000,
      limiteConsumido: 550000,
      percentualConsumido: 55,
      periodo: 'Diário'
    },
    {
      id: '3',
      tipo: 'Boletos',
      limiteTotal: 750000,
      limiteDisponivel: 600000,
      limiteConsumido: 150000,
      percentualConsumido: 20,
      periodo: 'Diário'
    },
    {
      id: '4',
      tipo: 'Pagamento em Lote',
      limiteTotal: 2000000,
      limiteDisponivel: 1250000,
      limiteConsumido: 750000,
      percentualConsumido: 37.5,
      periodo: 'Diário'
    },
    {
      id: '5',
      tipo: 'Tributos',
      limiteTotal: 300000,
      limiteDisponivel: 285000,
      limiteConsumido: 15000,
      percentualConsumido: 5,
      periodo: 'Diário'
    },
  ];

  const mockHistoricoSolicitacoes = [
    {
      id: '1',
      tipo: 'Aumento',
      categoria: 'PIX',
      valorAtual: 1000000,
      valorSolicitado: 1500000,
      dataSolicitacao: '05/10/2025',
      status: 'Em análise',
      previsao: '12/10/2025'
    },
    {
      id: '2',
      tipo: 'Aumento',
      categoria: 'TED/DOC',
      valorAtual: 500000,
      valorSolicitado: 750000,
      dataSolicitacao: '28/09/2025',
      status: 'Aprovado',
      dataAprovacao: '02/10/2025'
    },
    {
      id: '3',
      tipo: 'Redução',
      categoria: 'Boletos',
      valorAtual: 1000000,
      valorSolicitado: 750000,
      dataSolicitacao: '15/09/2025',
      status: 'Concluído',
      dataConclusao: '16/09/2025'
    },
  ];

  const getTotalLimiteDisponivel = () => {
    return mockLimites.reduce((sum, l) => sum + l.limiteDisponivel, 0);
  };

  const getTotalLimiteConsumido = () => {
    return mockLimites.reduce((sum, l) => sum + l.limiteConsumido, 0);
  };

  const getPercentualColor = (percentual: number) => {
    if (percentual >= 80) return 'text-red-600';
    if (percentual >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressBarColor = (percentual: number) => {
    if (percentual >= 80) return 'bg-red-500';
    if (percentual >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em análise':
        return 'bg-blue-100 text-blue-800';
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Concluído':
        return 'bg-gray-100 text-gray-800';
      case 'Rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSolicitarAlteracao = () => {
    if (!limitesSelecionado || !novoValor || !justificativa) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    alert(`Solicitação de ${tipoSolicitacao} enviada!\n\nTipo de Limite: ${limitesSelecionado}\nNovo Valor: R$ ${novoValor}\nJustificativa: ${justificativa}\n\nEm produção, isso enviaria a solicitação para análise.`);
    
    setShowSolicitacao(false);
    setLimitesSelecionado('');
    setNovoValor('');
    setJustificativa('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gerenciar Limites</h2>
          <p className="text-gray-600 mt-2">
            Acompanhe e gerencie seus limites de transações
          </p>
        </div>
        <Button
          onClick={() => setShowSolicitacao(!showSolicitacao)}
          className="bg-blue-900 hover:bg-blue-800"
        >
          <Edit className="mr-2 h-4 w-4" />
          Solicitar Alteração
        </Button>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 font-medium">Limite Total</p>
                <p className="text-2xl font-bold">
                  R$ {mockLimites.reduce((sum, l) => sum + l.limiteTotal, 0).toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-blue-200 mt-1">Todos os tipos</p>
              </div>
              <DollarSign className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100 font-medium">Limite Disponível</p>
                <p className="text-2xl font-bold">
                  R$ {getTotalLimiteDisponivel().toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-green-200 mt-1">Pronto para usar</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-orange-800 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-100 font-medium">Limite Consumido</p>
                <p className="text-2xl font-bold">
                  R$ {getTotalLimiteConsumido().toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-orange-200 mt-1">
                  {((getTotalLimiteConsumido() / mockLimites.reduce((sum, l) => sum + l.limiteTotal, 0)) * 100).toFixed(1)}% do total
                </p>
              </div>
              <TrendingDown className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Solicitação */}
      {showSolicitacao && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Solicitar Alteração de Limite
            </CardTitle>
            <CardDescription>
              Preencha o formulário para solicitar aumento ou redução de limite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Solicitação</Label>
                <select
                  value={tipoSolicitacao}
                  onChange={(e) => setTipoSolicitacao(e.target.value as 'aumento' | 'reducao')}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                >
                  <option value="aumento">Aumento de Limite</option>
                  <option value="reducao">Redução de Limite</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Limite</Label>
                <select
                  value={limitesSelecionado}
                  onChange={(e) => setLimitesSelecionado(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                >
                  <option value="">Selecione...</option>
                  {mockLimites.map((limite) => (
                    <option key={limite.id} value={limite.tipo}>
                      {limite.tipo} - Atual: R$ {limite.limiteTotal.toLocaleString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Novo Valor Solicitado (R$)</Label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Data Desejada</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Justificativa</Label>
                <textarea
                  className="w-full p-3 border rounded-md text-sm"
                  rows={4}
                  placeholder="Descreva o motivo da solicitação..."
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900">Importante</p>
                  <p className="text-sm text-yellow-800">
                    Solicitações de aumento de limite passam por análise de crédito e podem levar até 5 dias úteis. 
                    Reduções são processadas em até 1 dia útil.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSolicitarAlteracao} className="flex-1 bg-green-600 hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" />
                Enviar Solicitação
              </Button>
              <Button onClick={() => setShowSolicitacao(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Limites por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Limites por Tipo de Transação
          </CardTitle>
          <CardDescription>
            Acompanhe o consumo de cada tipo de transação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockLimites.map((limite) => (
              <div key={limite.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{limite.tipo}</h4>
                    <p className="text-sm text-gray-600">Período: {limite.periodo}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getPercentualColor(limite.percentualConsumido)}`}>
                      {limite.percentualConsumido}%
                    </p>
                    <p className="text-xs text-gray-500">consumido</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Consumido</span>
                    <span className="text-gray-600">Disponível</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getProgressBarColor(limite.percentualConsumido)}`}
                      style={{ width: `${limite.percentualConsumido}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Limite Total</p>
                    <p className="font-semibold text-gray-900">
                      R$ {limite.limiteTotal.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Consumido</p>
                    <p className="font-semibold text-orange-600">
                      R$ {limite.limiteConsumido.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Disponível</p>
                    <p className="font-semibold text-green-600">
                      R$ {limite.limiteDisponivel.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {limite.percentualConsumido >= 80 && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm text-red-800">
                        <strong>Atenção:</strong> Limite próximo do máximo. Considere solicitar aumento.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Solicitações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Solicitações
          </CardTitle>
          <CardDescription>
            Acompanhe suas solicitações de alteração de limite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockHistoricoSolicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {solicitacao.tipo} - {solicitacao.categoria}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(solicitacao.status)}`}>
                        {solicitacao.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Solicitado em: {solicitacao.dataSolicitacao}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Valor Solicitado</p>
                    <p className="text-lg font-bold text-gray-900">
                      R$ {solicitacao.valorSolicitado.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Valor Atual</p>
                    <p className="font-medium text-gray-900">
                      R$ {solicitacao.valorAtual.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      {solicitacao.status === 'Em análise' && 'Previsão de Resposta'}
                      {solicitacao.status === 'Aprovado' && 'Data de Aprovação'}
                      {solicitacao.status === 'Concluído' && 'Data de Conclusão'}
                    </p>
                    <p className="font-medium text-gray-900">
                      {solicitacao.previsao || solicitacao.dataAprovacao || solicitacao.dataConclusao}
                    </p>
                  </div>
                </div>

                {solicitacao.status === 'Em análise' && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-700">
                      Cancelar Solicitação
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações e Orientações */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Como Alterar Seus Limites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Aumento de Limite</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Clique em "Solicitar Alteração" e escolha "Aumento de Limite"</li>
                <li>• Selecione o tipo de transação e o novo valor desejado</li>
                <li>• Forneça uma justificativa detalhada</li>
                <li>• Aguarde análise de crédito (até 5 dias úteis)</li>
                <li>• Você será notificado por e-mail sobre a decisão</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Redução de Limite</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Clique em "Solicitar Alteração" e escolha "Redução de Limite"</li>
                <li>• Selecione o tipo de transação e o novo valor desejado</li>
                <li>• Processamento em até 1 dia útil</li>
                <li>• Não requer análise de crédito</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Documentos Necessários</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Balanço patrimonial atualizado (para aumentos acima de R$ 1.000.000)</li>
                <li>• Demonstrativo de resultado (últimos 3 meses)</li>
                <li>• Justificativa comercial detalhada</li>
              </ul>
            </div>

            <div className="bg-white border border-blue-300 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Importante</p>
                  <p className="text-sm text-blue-800">
                    Os limites são renovados diariamente às 00h00. Transações pendentes não consomem o limite até serem efetivadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

