import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Barcode, 
  Zap, 
  Edit3, 
  Upload,
  Camera,
  Check,
  FileText,
  ShoppingCart,
  X,
  Trash2,
  AlertCircle,
  QrCode,
  Smartphone,
  Lock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

type PaymentMethod = 'barcode' | 'pix' | 'manual' | null;
type BarcodeType = 'boleto' | 'tributo' | null;
type FlowStep = 'select-method' | 'input-data' | 'summary' | 'biometry' | 'success';

interface PaymentItem {
  id: string;
  tipo: 'boleto' | 'tributo' | 'pix' | 'manual';
  favorecido: string;
  documento?: string;
  codigoBarras?: string;
  chavePix?: string;
  valorOriginal: number;
  valorFinal: number;
  vencimento?: string;
  juros: number;
  multa: number;
  observacao: string;
}

export const PaymentsMake: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FlowStep>('select-method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [barcodeType, setBarcodeType] = useState<BarcodeType>(null);
  const [pixValue, setPixValue] = useState('');
  const [cart, setCart] = useState<PaymentItem[]>([]);
  const [biometryDone, setBiometryDone] = useState(false);
  const [transactionPassword, setTransactionPassword] = useState('');
  
  // Detecta automaticamente o tipo de código de barras
  const detectBarcodeType = (value: string): BarcodeType => {
    const cleanValue = value.replace(/\s/g, '');
    
    // Boleto bancário: geralmente 47 dígitos
    if (cleanValue.length === 47 || cleanValue.length === 48) {
      // Verifica se começa com banco (primeiros 3 dígitos)
      const bankCode = parseInt(cleanValue.substring(0, 3));
      if (bankCode >= 1 && bankCode <= 999) {
        return 'boleto';
      }
    }
    
    // Guia de arrecadação/tributo: geralmente 44 ou 48 dígitos
    if (cleanValue.length === 44 || cleanValue.length === 46) {
      return 'tributo';
    }
    
    return null;
  };

  const handleBarcodeChange = (value: string) => {
    setBarcodeValue(value);
    const type = detectBarcodeType(value);
    setBarcodeType(type);
  };

  const addToCart = (type: 'barcode' | 'pix' | 'dda', data?: any) => {
    let newItem: PaymentItem;
    
    if (type === 'barcode') {
      const valorBase = Math.random() * 5000 + 500; // Simula valor do boleto
      const juros = Math.random() * 50;
      const multa = Math.random() * 100;
      
      newItem = {
        id: `payment-${Date.now()}`,
        tipo: barcodeType || 'boleto',
        favorecido: barcodeType === 'tributo' ? 'Receita Federal' : 'Fornecedor XYZ',
        codigoBarras: barcodeValue,
        valorOriginal: valorBase,
        valorFinal: valorBase + juros + multa,
        vencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        juros,
        multa,
        observacao: ''
      };
    } else if (type === 'pix') {
      const valorBase = Math.random() * 2000 + 100;
      
      newItem = {
        id: `payment-${Date.now()}`,
        tipo: 'pix',
        favorecido: 'Beneficiário PIX',
        chavePix: pixValue,
        valorOriginal: valorBase,
        valorFinal: valorBase,
        juros: 0,
        multa: 0,
        observacao: ''
      };
    } else { // DDA
      newItem = {
        id: `payment-${Date.now()}`,
        tipo: 'boleto',
        favorecido: data.favorecido,
        documento: data.documento,
        codigoBarras: data.codigoBarras,
        valorOriginal: data.valor,
        valorFinal: data.valor,
        vencimento: data.vencimento,
        juros: 0,
        multa: 0,
        observacao: ''
      };
    }
    
    setCart([...cart, newItem]);
    
    // Limpa os campos
    setBarcodeValue('');
    setBarcodeType(null);
    setPixValue('');
  };

  const addDDAToCart = (boleto: any) => {
    addToCart('dda', {
      favorecido: boleto.favorecido,
      documento: boleto.documento,
      codigoBarras: boleto.codigoBarras,
      valor: parseFloat(boleto.valor.replace('R$ ', '').replace('.', '').replace(',', '.')),
      vencimento: boleto.vencimento
    });
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartItem = (id: string, field: keyof PaymentItem, value: any) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleContinue = () => {
    if (cart.length === 0) {
      alert('Adicione pelo menos um pagamento ao lote antes de continuar.');
      return;
    }
    setCurrentStep('summary');
  };

  const handleFinalizarPagamento = () => {
    // Verifica tipo de login
    if (user?.loginType === 'cpf') {
      setCurrentStep('biometry');
    } else {
      // Login por biometria - vai direto para senha
      setCurrentStep('biometry');
      setBiometryDone(true);
    }
  };

  const handleBiometryRead = () => {
    setBiometryDone(true);
  };

  const handleConfirmPayment = () => {
    if (!transactionPassword) {
      alert('Digite a senha de transação');
      return;
    }
    
    if (transactionPassword.length < 4) {
      alert('Senha de transação deve ter no mínimo 4 dígitos');
      return;
    }
    
    // Simula processamento
    setTimeout(() => {
      setCurrentStep('success');
    }, 1500);
  };

  const resetFlow = () => {
    setCurrentStep('select-method');
    setSelectedMethod(null);
    setBarcodeValue('');
    setBarcodeType(null);
    setPixValue('');
    setCart([]);
    setBiometryDone(false);
    setTransactionPassword('');
  };

  const paymentMethods = [
    {
      id: 'barcode' as PaymentMethod,
      title: 'Contas ou tributos',
      subtitle: 'Por código de barras',
      icon: Barcode,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'pix' as PaymentMethod,
      title: 'PIX',
      subtitle: 'Copia e cola ou QR Code',
      icon: Zap,
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'manual' as PaymentMethod,
      title: 'Digitação manual',
      subtitle: 'Preencha os dados',
      icon: Edit3,
      color: 'from-orange-600 to-orange-800'
    }
  ];

  const ddaBoletos = [
    { 
      id: 1, 
      favorecido: 'Energia Elétrica - CEMIG', 
      documento: '17.155.730/0001-64',
      codigoBarras: '34191790010104351004791020150008291070026000',
      valor: 'R$ 1.245,80', 
      vencimento: '15/11/2025', 
      status: 'A vencer' 
    },
    { 
      id: 2, 
      favorecido: 'Telefonia - Vivo Empresas', 
      documento: '02.558.157/0001-62',
      codigoBarras: '03399876543210123456789012345678901234567890',
      valor: 'R$ 890,50', 
      vencimento: '18/11/2025', 
      status: 'A vencer' 
    },
    { 
      id: 3, 
      favorecido: 'Água e Esgoto - COPASA', 
      documento: '17.281.106/0001-03',
      codigoBarras: '10491234567890123456789012345678901234567890',
      valor: 'R$ 456,30', 
      vencimento: '20/11/2025', 
      status: 'A vencer' 
    },
    { 
      id: 4, 
      favorecido: 'Internet - NET Empresarial', 
      documento: '33.000.118/0001-79',
      codigoBarras: '23791876543210987654321098765432109876543210',
      valor: 'R$ 680,00', 
      vencimento: '22/11/2025', 
      status: 'A vencer' 
    },
  ];

  // Renderização da seleção de método
  if (currentStep === 'select-method') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Realizar Pagamento</h1>
          <p className="text-gray-600 mt-2">Escolha a forma de pagamento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500"
                onClick={() => {
                  setSelectedMethod(method.id);
                  setCurrentStep('input-data');
                }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm">{method.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Renderização do formulário de entrada de dados
  if (currentStep === 'input-data') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('select-method')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Realizar Pagamento</h1>
            <p className="text-gray-600 mt-1">
              {selectedMethod === 'barcode' && 'Código de barras'}
              {selectedMethod === 'pix' && 'PIX - Copia e cola ou QR Code'}
              {selectedMethod === 'manual' && 'Digitação manual'}
            </p>
          </div>
        </div>

        {/* Carrinho de Pagamentos */}
        {cart.length > 0 && (
          <Card className="border-2 border-green-500 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <ShoppingCart className="h-5 w-5" />
                Lote de Pagamentos ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.favorecido}</p>
                      <p className="text-sm text-gray-500">
                        {item.tipo === 'pix' ? `PIX: ${item.chavePix?.substring(0, 30)}...` : `Cód: ${item.codigoBarras?.substring(0, 20)}...`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-gray-900">
                        R$ {item.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-green-200 flex justify-between items-center">
                <p className="text-lg font-bold text-green-900">
                  Total: R$ {cart.reduce((sum, item) => sum + item.valorFinal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <Button
                  onClick={handleContinue}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Continuar com {cart.length} {cart.length === 1 ? 'pagamento' : 'pagamentos'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Formulário de Código de Barras */}
        {selectedMethod === 'barcode' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="h-5 w-5" />
                Código de Barras
              </CardTitle>
              <CardDescription>
                Digite, escaneie ou faça upload do código de barras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="barcode">Código de barras</Label>
                <Input
                  id="barcode"
                  type="text"
                  placeholder="Digite ou escaneie o código de barras"
                  value={barcodeValue}
                  onChange={(e) => handleBarcodeChange(e.target.value)}
                  className="font-mono"
                  maxLength={48}
                />
                {barcodeType && (
                  <div className={`flex items-center gap-2 text-sm ${
                    barcodeType === 'boleto' ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    <Check className="h-4 w-4" />
                    <span className="font-medium">
                      {barcodeType === 'boleto' ? 'Boleto de cobrança detectado' : 'Guia de arrecadação/tributo detectado'}
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  O código deve conter até 48 dígitos
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  <Camera className="mr-2 h-4 w-4" />
                  Usar Leitora
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!barcodeValue || !barcodeType}
                  onClick={() => addToCart('barcode')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Incluir em Lote
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">💡 Dica:</p>
                <p>O sistema detecta automaticamente se é um boleto de cobrança ou guia de tributo. Você pode adicionar vários pagamentos ao lote antes de continuar.</p>
              </div>

              {/* Meus Boletos DDA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Meus boletos DDA
                </h4>
                <div className="space-y-3">
                  {ddaBoletos.map((boleto) => (
                    <div
                      key={boleto.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{boleto.favorecido}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Vencimento: {boleto.vencimento}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">{boleto.valor}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                            {boleto.status}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addDDAToCart(boleto)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Formulário de PIX */}
        {selectedMethod === 'pix' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                PIX - Copia e Cola ou QR Code
              </CardTitle>
              <CardDescription>
                Cole o código PIX ou faça upload do QR Code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pix">Código PIX ou QR Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="pix"
                    type="text"
                    placeholder="Cole aqui o código PIX"
                    value={pixValue}
                    onChange={(e) => setPixValue(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline"
                    className="whitespace-nowrap"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        setPixValue(text);
                      } catch (err) {
                        alert('Erro ao colar. Cole manualmente.');
                      }
                    }}
                  >
                    Colar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Cole o código PIX ou faça upload do QR Code abaixo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-upload">Ou faça upload do QR Code</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  <input
                    id="qr-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="qr-upload" className="cursor-pointer">
                    <QrCode className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Clique para fazer upload do QR Code
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG ou JPG até 5MB
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Camera className="mr-2 h-4 w-4" />
                  Usar Câmera
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!pixValue}
                  onClick={() => addToCart('pix')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Incluir em Lote
                </Button>
              </div>

              <div className="bg-green-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">💡 Dica:</p>
                <p>Você pode adicionar vários PIX ao lote. Cole o código, clique em "Incluir em Lote" e repita para adicionar mais pagamentos.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Formulário Manual */}
        {selectedMethod === 'manual' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Digitação Manual
              </CardTitle>
              <CardDescription>
                Preencha os dados do pagamento manualmente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="favorecido">Favorecido</Label>
                  <Input id="favorecido" placeholder="Nome do favorecido" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento">CPF/CNPJ</Label>
                  <Input id="documento" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco">Banco</Label>
                  <Input id="banco" placeholder="Código do banco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencia">Agência</Label>
                  <Input id="agencia" placeholder="0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conta">Conta</Label>
                  <Input id="conta" placeholder="00000-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input id="valor" type="number" placeholder="0,00" />
                </div>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Check className="mr-2 h-4 w-4" />
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Renderização do resumo
  if (currentStep === 'summary') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('input-data')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resumo do Lote de Pagamentos</h1>
            <p className="text-gray-600 mt-1">Revise os valores e finalize</p>
          </div>
        </div>

        <Card className="border-2 border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {cart.length} {cart.length === 1 ? 'Pagamento' : 'Pagamentos'} no Lote
              </span>
              <span className="text-2xl font-bold text-blue-900">
                R$ {cart.reduce((sum, item) => sum + item.valorFinal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={item.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded">
                          #{index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{item.favorecido}</h3>
                      </div>
                      {item.documento && (
                        <p className="text-sm text-gray-600">Documento: {item.documento}</p>
                      )}
                      {item.vencimento && (
                        <p className="text-sm text-gray-600">Vencimento: {item.vencimento}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-gray-500">Valor Original</Label>
                      <p className="font-bold text-gray-900">
                        R$ {item.valorOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Juros</Label>
                      <p className="font-bold text-orange-600">
                        + R$ {item.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Multa</Label>
                      <p className="font-bold text-red-600">
                        + R$ {item.multa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Valor Final</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.valorFinal}
                        onChange={(e) => updateCartItem(item.id, 'valorFinal', parseFloat(e.target.value) || 0)}
                        className="font-bold text-green-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`obs-${item.id}`} className="text-xs text-gray-500">
                      Observação (opcional)
                    </Label>
                    <Textarea
                      id={`obs-${item.id}`}
                      placeholder="Adicione uma observação para este pagamento..."
                      value={item.observacao}
                      onChange={(e) => updateCartItem(item.id, 'observacao', e.target.value)}
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('input-data')}
          >
            Adicionar Mais Pagamentos
          </Button>
          <Button
            onClick={handleFinalizarPagamento}
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
          >
            <Check className="mr-2 h-5 w-5" />
            Finalizar Pagamento
          </Button>
        </div>
      </div>
    );
  }

  // Renderização da autenticação biométrica
  if (currentStep === 'biometry') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Autenticação de Pagamento</h1>
          <p className="text-gray-600 mt-2">Confirme sua identidade para concluir</p>
        </div>

        {user?.loginType === 'cpf' && !biometryDone && (
          <Card className="border-2 border-orange-500">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertCircle className="h-5 w-5" />
                Autenticação Biométrica Necessária
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Você fez login com CPF e senha.</strong>
                </p>
                <p className="text-gray-600">
                  Para concluir pagamentos, é necessário realizar autenticação biométrica através do app CAIXA.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left space-y-2">
                <p className="font-medium text-blue-900">📱 Como fazer:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Abra o app CAIXA no seu celular</li>
                  <li>Toque em "Ler QR Code"</li>
                  <li>Aponte a câmera para o QR Code acima</li>
                  <li>Confirme sua biometria no app</li>
                </ol>
              </div>

              <Button
                onClick={handleBiometryRead}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Simular Leitura de Biometria
              </Button>
            </CardContent>
          </Card>
        )}

        {(user?.loginType === 'biometry' || biometryDone) && (
          <Card className="border-2 border-green-500">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle className="h-5 w-5" />
                {biometryDone ? 'Biometria Confirmada' : 'Login Biométrico Detectado'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {biometryDone && (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-900">Biometria confirmada com sucesso!</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="transaction-password" className="text-base font-medium">
                    Senha de Transação
                  </Label>
                  <p className="text-sm text-gray-600 mb-2">
                    Digite sua senha de 4 a 6 dígitos para confirmar o pagamento
                  </p>
                  <Input
                    id="transaction-password"
                    type="password"
                    maxLength={6}
                    placeholder="••••••"
                    value={transactionPassword}
                    onChange={(e) => setTransactionPassword(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl font-bold tracking-widest"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Resumo do Pagamento:</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Quantidade de pagamentos:</span>
                      <span className="font-bold">{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-green-600 pt-2 border-t">
                      <span>Valor Total:</span>
                      <span>R$ {cart.reduce((sum, item) => sum + item.valorFinal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('summary')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    disabled={transactionPassword.length < 4}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
                  >
                    <Lock className="mr-2 h-5 w-5" />
                    Confirmar Pagamento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Renderização de sucesso
  if (currentStep === 'success') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-2 border-green-500">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagamento Realizado com Sucesso!</h1>
              <p className="text-gray-600">
                {cart.length} {cart.length === 1 ? 'pagamento foi processado' : 'pagamentos foram processados'}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">Comprovantes gerados:</p>
              <div className="space-y-2">
                {cart.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-sm text-gray-700">
                      #{index + 1} - {item.favorecido}
                    </span>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Comprovante
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                Total: R$ {cart.reduce((sum, item) => sum + item.valorFinal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
              >
                <FileText className="mr-2 h-4 w-4" />
                Baixar Todos os Comprovantes
              </Button>
              <Button
                onClick={resetFlow}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Novo Pagamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

