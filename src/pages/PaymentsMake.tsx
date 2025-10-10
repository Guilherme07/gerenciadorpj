import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Barcode, 
  QrCode, 
  Copy, 
  Edit3, 
  Upload,
  Camera,
  Check
} from 'lucide-react';

type PaymentMethod = 'barcode' | 'pix-copy' | 'pix-qr' | 'manual' | null;

export const PaymentsMake: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [pixCopyPaste, setPixCopyPaste] = useState('');
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPixCopyPaste(text);
    } catch (err) {
      alert('Erro ao colar do clipboard. Por favor, cole manualmente.');
    }
  };

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQrCodeFile(e.target.files[0]);
    }
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
      id: 'pix-copy' as PaymentMethod,
      title: 'PIX Copia e Cola',
      subtitle: 'Cole o código PIX',
      icon: Copy,
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'pix-qr' as PaymentMethod,
      title: 'PIX QR Code',
      subtitle: 'Escaneie ou faça upload',
      icon: QrCode,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'manual' as PaymentMethod,
      title: 'Digitação manual',
      subtitle: 'Preencha os dados',
      icon: Edit3,
      color: 'from-orange-600 to-orange-800'
    }
  ];

  const renderMethodForm = () => {
    switch (selectedMethod) {
      case 'barcode':
        return (
          <Card className="mt-6">
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
                  onChange={(e) => setBarcodeValue(e.target.value)}
                  className="font-mono"
                  maxLength={48}
                />
                <p className="text-xs text-gray-500">
                  O código deve conter até 48 dígitos
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="barcode-upload">Ou faça upload do boleto</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    id="barcode-upload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <label htmlFor="barcode-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Clique para fazer upload do boleto
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG ou PDF até 5MB
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  <Camera className="mr-2 h-4 w-4" />
                  Usar Leitora
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!barcodeValue}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Continuar
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">💡 Dica:</p>
                <p>Você pode digitar, usar uma leitora de código de barras ou fazer upload do boleto em PDF/imagem.</p>
              </div>

              {/* Meus Boletos DDA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Meus boletos DDA
                </h4>
                <div className="space-y-3">
                  {[
                    { id: 1, favorecido: 'Energia Elétrica - CEMIG', valor: 'R$ 1.245,80', vencimento: '15/10/2025', status: 'A vencer' },
                    { id: 2, favorecido: 'Telefonia - Vivo Empresas', valor: 'R$ 890,50', vencimento: '18/10/2025', status: 'A vencer' },
                    { id: 3, favorecido: 'Água e Esgoto - COPASA', valor: 'R$ 456,30', vencimento: '20/10/2025', status: 'A vencer' },
                    { id: 4, favorecido: 'Internet - NET Empresarial', valor: 'R$ 680,00', vencimento: '22/10/2025', status: 'A vencer' },
                  ].map((boleto) => (
                    <div
                      key={boleto.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{boleto.favorecido}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Vencimento: {boleto.vencimento}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{boleto.valor}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                          {boleto.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'pix-copy':
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5" />
                PIX Copia e Cola
              </CardTitle>
              <CardDescription>
                Cole o código PIX que você recebeu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pix-copy">Código PIX</Label>
                <div className="flex gap-2">
                  <Input
                    id="pix-copy"
                    type="text"
                    placeholder="Cole aqui o código PIX"
                    value={pixCopyPaste}
                    onChange={(e) => setPixCopyPaste(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button 
                    onClick={handlePaste}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Colar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  O código PIX geralmente começa com números e letras aleatórias
                </p>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!pixCopyPaste}
              >
                <Check className="mr-2 h-4 w-4" />
                Continuar
              </Button>

              <div className="bg-green-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">💡 Dica:</p>
                <p>Copie o código PIX do WhatsApp, e-mail ou outro aplicativo e clique em "Colar" para preencher automaticamente.</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'pix-qr':
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                PIX QR Code
              </CardTitle>
              <CardDescription>
                Faça upload da imagem do QR Code ou use a câmera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-upload">Upload do QR Code</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                  <input
                    id="qr-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleQrCodeUpload}
                    className="hidden"
                  />
                  <label htmlFor="qr-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      {qrCodeFile ? qrCodeFile.name : 'Clique para fazer upload'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG ou PDF até 5MB
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Camera className="mr-2 h-4 w-4" />
                  Usar Câmera
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!qrCodeFile}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Continuar
                </Button>
              </div>

              <div className="bg-purple-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">💡 Dica:</p>
                <p>Tire uma foto do QR Code ou faça um print da tela e faça upload da imagem.</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'manual':
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Digitação Manual
              </CardTitle>
              <CardDescription>
                Selecione o tipo de pagamento e preencha os dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-type">Tipo de pagamento</Label>
                <select
                  id="payment-type"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione o tipo de pagamento</option>
                  <option value="ted">TED - Transferência Eletrônica Disponível</option>
                  <option value="doc">DOC - Documento de Crédito</option>
                  <option value="boleto">Boleto Bancário</option>
                  <option value="tributo-darf">Tributo - DARF</option>
                  <option value="tributo-gps">Tributo - GPS (INSS)</option>
                  <option value="tributo-gare">Tributo - GARE</option>
                  <option value="concessionaria">Concessionária</option>
                  <option value="fornecedor">Fornecedor</option>
                  <option value="salario">Folha de Pagamento</option>
                  <option value="outros">Outros</option>
                </select>
                <p className="text-xs text-gray-500">
                  Os campos serão habilitados após selecionar o tipo
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-md text-sm text-gray-700">
                <p className="font-medium mb-1">ℹ️ Informação:</p>
                <p>Selecione o tipo de pagamento acima para visualizar os campos específicos de preenchimento.</p>
              </div>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled
              >
                <Check className="mr-2 h-4 w-4" />
                Continuar
              </Button>
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
        <h2 className="text-3xl font-bold text-gray-900">Realizar Pagamentos</h2>
        <p className="text-gray-600 mt-2">
          Escolha o método de pagamento que deseja utilizar
        </p>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <Card
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
            >
              <div className={`h-full bg-gradient-to-br ${method.color} p-6 text-white rounded-lg`}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{method.title}</h3>
                    <p className="text-sm text-white/90">{method.subtitle}</p>
                  </div>
                  {isSelected && (
                    <div className="mt-2 flex items-center gap-1 text-sm font-medium">
                      <Check className="h-4 w-4" />
                      <span>Selecionado</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Method Form */}
      {renderMethodForm()}

      {/* Help Section */}
      {!selectedMethod && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Como funciona?</h4>
                <p className="text-sm text-blue-800">
                  Selecione um dos métodos de pagamento acima para iniciar. Cada método possui campos específicos para facilitar o processo de pagamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
