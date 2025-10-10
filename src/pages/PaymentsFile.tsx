import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload,
  CheckCircle,
  Send,
  Search,
  Shield,
  Activity,
  XCircle,
  FileText,
  Building,
  ChevronRight,
  Download,
  AlertCircle,
  Clock,
  CheckSquare,
  FileCheck
} from 'lucide-react';

type ServiceType = 
  | 'upload'
  | 'validate'
  | 'send'
  | 'consult'
  | 'authorize'
  | 'track'
  | 'cancel'
  | 'receipts'
  | null;

interface Convenio {
  id: string;
  nome: string;
  codigo: string;
  banco: string;
  tipo: string;
  status: 'Ativo' | 'Inativo';
}

export const PaymentsFile: React.FC = () => {
  const [selectedConvenio, setSelectedConvenio] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const mockConvenios: Convenio[] = [
    {
      id: '1',
      nome: 'Convênio Folha de Pagamento',
      codigo: 'CONV-001',
      banco: '104 - Caixa Econômica Federal',
      tipo: 'Folha de Pagamento',
      status: 'Ativo'
    },
    {
      id: '2',
      nome: 'Convênio Fornecedores',
      codigo: 'CONV-002',
      banco: '104 - Caixa Econômica Federal',
      tipo: 'Pagamentos Diversos',
      status: 'Ativo'
    },
    {
      id: '3',
      nome: 'Convênio Tributos',
      codigo: 'CONV-003',
      banco: '104 - Caixa Econômica Federal',
      tipo: 'Tributos e Impostos',
      status: 'Ativo'
    },
    {
      id: '4',
      nome: 'Convênio Boletos',
      codigo: 'CONV-004',
      banco: '104 - Caixa Econômica Federal',
      tipo: 'Pagamento de Boletos',
      status: 'Ativo'
    },
  ];

  const services = [
    {
      id: 'upload' as ServiceType,
      title: 'Upload de Arquivo',
      description: 'Envie arquivos CNAB 240/400 para processamento',
      icon: Upload,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'validate' as ServiceType,
      title: 'Validar Arquivo',
      description: 'Valide o layout e conteúdo do arquivo antes de enviar',
      icon: CheckCircle,
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'send' as ServiceType,
      title: 'Enviar Arquivo',
      description: 'Envie arquivo validado para processamento bancário',
      icon: Send,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'consult' as ServiceType,
      title: 'Consultar Arquivo Remessa/Retorno',
      description: 'Consulte status e baixe arquivos de retorno',
      icon: Search,
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 'authorize' as ServiceType,
      title: 'Autorizar Arquivo Pendente',
      description: 'Autorize arquivos que aguardam aprovação',
      icon: Shield,
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      id: 'track' as ServiceType,
      title: 'Acompanhar Arquivo',
      description: 'Acompanhe o processamento em tempo real',
      icon: Activity,
      color: 'from-cyan-600 to-cyan-800'
    },
    {
      id: 'cancel' as ServiceType,
      title: 'Cancelar Arquivo',
      description: 'Cancele arquivos antes do processamento final',
      icon: XCircle,
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'receipts' as ServiceType,
      title: 'Consultar Comprovantes',
      description: 'Baixe comprovantes de pagamentos processados',
      icon: FileText,
      color: 'from-indigo-600 to-indigo-800'
    },
  ];

  const selectedConvenioData = mockConvenios.find(c => c.id === selectedConvenio);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'upload':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload de Arquivo
              </CardTitle>
              <CardDescription>
                Envie arquivos CNAB 240 ou CNAB 400 para processamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Arraste o arquivo aqui ou clique para selecionar
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Formatos aceitos: .REM, .TXT (CNAB 240/400) - Máx: 10MB
                </p>
                <Input
                  type="file"
                  accept=".rem,.txt"
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                />
              </div>

              {uploadedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">{uploadedFile.name}</p>
                        <p className="text-sm text-green-700">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Processar Arquivo
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Informações Importantes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Certifique-se de que o arquivo está no formato CNAB correto</li>
                  <li>• O arquivo será validado automaticamente após o upload</li>
                  <li>• Erros de layout serão reportados antes do envio</li>
                  <li>• Convênio selecionado: <strong>{selectedConvenioData?.nome}</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 'validate':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Validar Arquivo
              </CardTitle>
              <CardDescription>
                Valide o layout e conteúdo do arquivo antes de enviar ao banco
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Selecione o arquivo para validação</Label>
                <Input type="file" accept=".rem,.txt" />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Iniciar Validação
              </Button>

              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Itens Validados:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Formato CNAB (240 ou 400)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Header e Trailer corretos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Dados bancários válidos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Valores e datas consistentes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span>Quantidade de registros</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'send':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Enviar Arquivo
              </CardTitle>
              <CardDescription>
                Envie arquivo validado para processamento bancário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900">Atenção</p>
                    <p className="text-sm text-yellow-800">
                      Após o envio, o arquivo será processado pelo banco. Certifique-se de que todas as informações estão corretas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Resumo do Arquivo:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Convênio:</p>
                    <p className="font-medium">{selectedConvenioData?.nome}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Código:</p>
                    <p className="font-medium">{selectedConvenioData?.codigo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tipo:</p>
                    <p className="font-medium">{selectedConvenioData?.tipo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status:</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Validado
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Total de Registros:</p>
                    <p className="font-medium">125 pagamentos</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valor Total:</p>
                    <p className="font-medium text-lg">R$ 245.680,50</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar para Processamento
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'consult':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Consultar Arquivo Remessa/Retorno
              </CardTitle>
              <CardDescription>
                Consulte arquivos enviados e baixe arquivos de retorno
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Data Início</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Status</Label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm">
                    <option value="">Todos</option>
                    <option value="processado">Processado</option>
                    <option value="pendente">Pendente</option>
                    <option value="erro">Com Erro</option>
                  </select>
                </div>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Search className="mr-2 h-4 w-4" />
                Buscar Arquivos
              </Button>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-gray-600" />
                          <p className="font-medium">REMESSA_{selectedConvenioData?.codigo}_10102025_{i}.REM</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Data Envio:</p>
                            <p>10/10/2025 14:30</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Registros:</p>
                            <p>{45 + i * 10} pagamentos</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status:</p>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                              Processado
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Retorno
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'authorize':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Autorizar Arquivo Pendente
              </CardTitle>
              <CardDescription>
                Autorize arquivos que aguardam aprovação para processamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>2 arquivos</strong> aguardando sua autorização
                </p>
              </div>

              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          Arquivo de Folha - Outubro 2025
                        </p>
                        <p className="text-sm text-gray-600">
                          Enviado por: Maria Santos (Financeiro)
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Aguardando Autorização
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Data:</p>
                        <p className="font-medium">09/10/2025 16:45</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Registros:</p>
                        <p className="font-medium">52 pagamentos</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor Total:</p>
                        <p className="font-medium text-lg">R$ 95.000,00</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Shield className="mr-2 h-4 w-4" />
                        Autorizar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'track':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Acompanhar Arquivo
              </CardTitle>
              <CardDescription>
                Acompanhe o processamento do arquivo em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Número do Protocolo</Label>
                <div className="flex gap-2">
                  <Input placeholder="Digite o número do protocolo" />
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Timeline de Processamento</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-green-200"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-900">Arquivo Recebido</p>
                      <p className="text-sm text-gray-600">10/10/2025 14:30</p>
                      <p className="text-xs text-gray-500">Arquivo recebido com sucesso</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-green-200"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-900">Validação Concluída</p>
                      <p className="text-sm text-gray-600">10/10/2025 14:32</p>
                      <p className="text-xs text-gray-500">Layout validado com sucesso</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-900">Em Processamento</p>
                      <p className="text-sm text-gray-600">10/10/2025 14:35</p>
                      <p className="text-xs text-gray-500">Processando 125 registros...</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium text-gray-400">Aguardando Conclusão</p>
                      <p className="text-sm text-gray-400">Previsão: 10/10/2025 15:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'cancel':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Cancelar Arquivo
              </CardTitle>
              <CardDescription>
                Cancele arquivos antes do processamento final
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900">Atenção</p>
                    <p className="text-sm text-red-800">
                      O cancelamento é irreversível. Apenas arquivos que ainda não foram processados podem ser cancelados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[1].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          REMESSA_{selectedConvenioData?.codigo}_10102025.REM
                        </p>
                        <p className="text-sm text-gray-600">
                          Enviado em: 10/10/2025 14:30
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        Em Processamento
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Registros:</p>
                        <p className="font-medium">125 pagamentos</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor Total:</p>
                        <p className="font-medium">R$ 245.680,50</p>
                      </div>
                    </div>

                    <div>
                      <Label>Motivo do Cancelamento</Label>
                      <textarea
                        className="w-full mt-2 p-2 border rounded-md text-sm"
                        rows={3}
                        placeholder="Descreva o motivo do cancelamento..."
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-700 hover:bg-red-50">
                        <XCircle className="mr-2 h-4 w-4" />
                        Confirmar Cancelamento
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Voltar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'receipts':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Consultar Comprovantes
              </CardTitle>
              <CardDescription>
                Baixe comprovantes de pagamentos processados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Data Início</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input type="date" />
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Search className="mr-2 h-4 w-4" />
                Buscar Comprovantes
              </Button>

              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          Arquivo: REMESSA_{selectedConvenioData?.codigo}_0{i}102025.REM
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                          <div>
                            <p className="text-gray-500">Data Processamento:</p>
                            <p>0{i}/10/2025</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Comprovantes:</p>
                            <p>{45 + i * 10} disponíveis</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Valor Total:</p>
                            <p className="font-medium">R$ {(125000 + i * 10000).toLocaleString('pt-BR')},00</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Individual
                        </Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          <Download className="mr-2 h-4 w-4" />
                          Lote (ZIP)
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Pagamentos por Arquivo</h2>
        <p className="text-gray-600 mt-2">
          Gerencie pagamentos em lote através de arquivos CNAB
        </p>
      </div>

      {/* Seleção de Convênio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Selecione o Convênio
          </CardTitle>
          <CardDescription>
            Escolha o convênio bancário para gerenciar os arquivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="convenio">Convênio</Label>
              <select
                id="convenio"
                value={selectedConvenio}
                onChange={(e) => {
                  setSelectedConvenio(e.target.value);
                  setSelectedService(null);
                }}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um convênio</option>
                {mockConvenios.map((conv) => (
                  <option key={conv.id} value={conv.id}>
                    {conv.nome} - {conv.codigo}
                  </option>
                ))}
              </select>
            </div>

            {selectedConvenioData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Informações do Convênio:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700">Código:</p>
                    <p className="font-medium text-blue-900">{selectedConvenioData.codigo}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Banco:</p>
                    <p className="font-medium text-blue-900">{selectedConvenioData.banco}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Tipo:</p>
                    <p className="font-medium text-blue-900">{selectedConvenioData.tipo}</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Status:</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {selectedConvenioData.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Serviços Disponíveis */}
      {selectedConvenio && !selectedService && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Serviços Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative overflow-hidden rounded-lg p-6 text-white transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-br ${service.color}`}
                >
                  <Icon className="h-10 w-10 mb-3" />
                  <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
                  <p className="text-sm text-white/90 mb-4">{service.description}</p>
                  <div className="flex items-center justify-end text-sm font-medium">
                    Acessar
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Conteúdo do Serviço Selecionado */}
      {selectedService && (
        <div>
          <Button
            onClick={() => setSelectedService(null)}
            variant="outline"
            className="mb-4"
          >
            ← Voltar aos Serviços
          </Button>
          {renderServiceContent()}
        </div>
      )}
    </div>
  );
};

