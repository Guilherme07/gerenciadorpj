import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, KeyRound, UserPlus, QrCode, ChevronDown, ChevronUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const Login: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [showCPFLogin, setShowCPFLogin] = useState(false);
  const { login } = useAuth();

  // URL para o QR Code (pode ser customizada)
  const qrCodeValue = 'https://caixa.gov.br/empresa/login/qrcode/12345';

  useEffect(() => {
    // Verifica se a API de autenticação Web está disponível
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    if (window.PublicKeyCredential) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setBiometricAvailable(available);
      } catch (err) {
        setBiometricAvailable(false);
      }
    }
  };

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara de CPF: 000.000.000-00
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
    return numbers.slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Remove formatação do CPF antes de enviar
      const cleanCPF = cpf.replace(/\D/g, '');
      await login(cleanCPF, password);
    } catch (err) {
      setError('CPF ou senha inválidos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Simulação de autenticação biométrica
      // Em produção, isso usaria a Web Authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simula sucesso da biometria
      await login('biometric@user.com', 'biometric');
    } catch (err) {
      setError('Falha na autenticação biométrica. Tente outro método.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRCodeLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Simulação de autenticação via QR Code
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simula sucesso do QR Code
      await login('qrcode@user.com', 'qrcode');
    } catch (err) {
      setError('Falha na autenticação via QR Code. Tente outro método.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAccount = () => {
    // Em produção, isso redirecionaria para a página de abertura de conta
    alert('Redirecionando para abertura de conta PJ...\n\nEm produção, isso abriria o formulário de cadastro de nova empresa.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-orange-500 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-lg px-6 py-3 mb-4 shadow-lg">
            <h1 className="text-3xl font-bold text-blue-900">CAIXA</h1>
            <p className="text-sm text-gray-600">Empresas</p>
          </div>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Gerenciador Financeiro PJ</CardTitle>
            <CardDescription>
              Acesse sua conta para gerenciar as finanças da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Login */}
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg border-2 border-blue-200">
                <QRCodeSVG 
                  value={qrCodeValue}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <p className="text-sm text-gray-700 font-medium mt-4 text-center">
                  Escaneie o QR Code com seu APP Caixa
                </p>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Abra o aplicativo CAIXA no seu celular e use a câmera para escanear
                </p>
              </div>
            </div>

            {/* Autenticação Biométrica */}
            {biometricAvailable && (
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  onClick={handleBiometricLogin}
                  disabled={isLoading}
                >
                  <Fingerprint className="mr-2 h-5 w-5" />
                  Entrar com Biometria
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Use Face ID, Touch ID ou Windows Hello
                </p>
              </div>
            )}

            {/* Botão para mostrar/ocultar login com CPF */}
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                onClick={() => setShowCPFLogin(!showCPFLogin)}
              >
                <KeyRound className="mr-2 h-5 w-5" />
                Entrar com CPF e Senha
                {showCPFLogin ? (
                  <ChevronUp className="ml-auto h-5 w-5" />
                ) : (
                  <ChevronDown className="ml-auto h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Login com CPF e Senha (Colapsável) */}
            {showCPFLogin && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-blue-600 hover:underline">
                    Esqueci minha senha
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    Primeiro acesso
                  </a>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-900 hover:bg-blue-800"
                  disabled={isLoading}
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

            {/* Botão Abra sua conta */}
            <Button
              type="button"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleOpenAccount}
              disabled={isLoading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Abra sua conta
            </Button>

            <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-blue-50 rounded-md">
              <p className="font-medium">💡 Protótipo de Demonstração</p>
              <p className="mt-1">Use qualquer método de autenticação para acessar</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-white text-sm">
          <p>© 2025 CAIXA Econômica Federal - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};
