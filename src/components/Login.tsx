import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Chrome, Building2, Shield, KeyRound } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const { login } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
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

  const handleSSOLogin = async (provider: string) => {
    setError('');
    setIsLoading(true);

    try {
      // Simulação de SSO
      // Em produção, isso redirecionaria para o provedor OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await login(`${provider}@sso.com`, 'sso');
    } catch (err) {
      setError(`Falha na autenticação via ${provider}. Tente novamente.`);
    } finally {
      setIsLoading(false);
    }
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

            {/* SSO Options */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 text-center">
                Autenticação Corporativa (SSO)
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-2"
                  onClick={() => handleSSOLogin('Google')}
                  disabled={isLoading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-2"
                  onClick={() => handleSSOLogin('Microsoft')}
                  disabled={isLoading}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Microsoft
                </Button>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2"
                onClick={() => handleSSOLogin('CAIXA SSO')}
                disabled={isLoading}
              >
                <Shield className="mr-2 h-5 w-5" />
                Portal CAIXA Empresas
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">ou</span>
              </div>
            </div>

            {/* Login Tradicional */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? 'Entrando...' : 'Entrar com E-mail e Senha'}
              </Button>

              <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-blue-50 rounded-md">
                <p className="font-medium">💡 Protótipo de Demonstração</p>
                <p className="mt-1">Use qualquer método de autenticação para acessar</p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-white text-sm">
          <p>© 2025 CAIXA Econômica Federal - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};
