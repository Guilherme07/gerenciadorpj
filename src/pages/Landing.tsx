import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Shield,
  Clock,
  Smartphone,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigateToLogin = () => {
    if ((window as any).navigateToLogin) {
      (window as any).navigateToLogin();
    } else {
      window.location.href = '/login';
    }
  };

  const features = [
    {
      icon: Building2,
      title: 'Gestão Completa',
      description: 'Controle total das finanças da sua empresa em um só lugar'
    },
    {
      icon: TrendingUp,
      title: 'Análises em Tempo Real',
      description: 'Gráficos e relatórios atualizados automaticamente'
    },
    {
      icon: FileText,
      title: 'Notas Fiscais',
      description: 'Gerencie notas fiscais recebidas, emitidas e pendentes'
    },
    {
      icon: CreditCard,
      title: 'Pagamentos Ágeis',
      description: 'Realize pagamentos e transferências com segurança'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Personalizados',
      description: 'Crie relatórios financeiros, fiscais e de análises'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Autenticação biométrica e criptografia de ponta'
    }
  ];

  const benefits = [
    'Acesso 24 horas por dia, 7 dias por semana',
    'Interface intuitiva e fácil de usar',
    'Suporte técnico especializado',
    'Integração com sistemas contábeis',
    'Backup automático de dados',
    'Conformidade com normas fiscais'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">CAIXA</h1>
              <p className="text-xs text-blue-200">Empresas</p>
            </div>
          </div>
          <Button 
            onClick={navigateToLogin}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Acessar Gerenciador
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Gerenciador Financeiro para Empresas
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Simplifique a gestão financeira da sua empresa com tecnologia e segurança CAIXA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigateToLogin()}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg h-14 px-8"
              >
                Acessar Gerenciador
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white text-lg h-14 px-8"
                onClick={() => navigateToLogin()}
              >
                Abrir Conta PJ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo que sua empresa precisa para gerenciar as finanças de forma eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Por que escolher o Gerenciador CAIXA?
              </h3>
              <p className="text-lg text-gray-600">
                Benefícios exclusivos para sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150mil+</div>
              <div className="text-blue-200">Empresas Cadastradas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">R$ 50bi+</div>
              <div className="text-blue-200">Transacionados por Mês</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Disponibilidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl text-orange-100 mb-8">
              Acesse agora e descubra como é fácil gerenciar as finanças da sua empresa
            </p>
            <Button 
              size="lg"
              onClick={() => navigateToLogin()}
              className="bg-white text-orange-600 hover:bg-gray-100 text-lg h-14 px-8"
            >
              Acessar Gerenciador
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Sobre a CAIXA</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Quem Somos</a></li>
                <li><a href="#" className="hover:text-white">Sustentabilidade</a></li>
                <li><a href="#" className="hover:text-white">Trabalhe Conosco</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Contas</a></li>
                <li><a href="#" className="hover:text-white">Crédito</a></li>
                <li><a href="#" className="hover:text-white">Investimentos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-white">Ouvidoria</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Atendimento</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>24 horas, 7 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>0800 726 0101</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 CAIXA Econômica Federal - Todos os direitos reservados</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white">Política de Privacidade</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Termos de Uso</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Segurança</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
