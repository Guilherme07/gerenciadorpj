import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { Landing } from '@/pages/Landing';
import { ProfileSelector } from '@/components/ProfileSelector';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Accounts } from '@/pages/Accounts';
import { Transactions } from '@/pages/Transactions';
import { ReportsFinancial } from '@/pages/ReportsFinancial';
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading, selectedProfile, selectProfile } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLogin, setShowLogin] = useState(false);

  // Função para navegar para login
  const navigateToLogin = () => {
    window.history.pushState({}, '', '/login');
    setShowLogin(true);
    setCurrentPage('login');
  };

  // TODOS OS useEffect DEVEM ESTAR ANTES DE QUALQUER RETURN CONDICIONAL
  
  // Detecta navegação para /login
  useEffect(() => {
    const handleNavigation = () => {
      if (window.location.pathname === '/login') {
        setShowLogin(true);
        setCurrentPage('login');
      } else if (window.location.pathname === '/') {
        setShowLogin(false);
        setCurrentPage('landing');
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  // Expor função globalmente para Landing page
  useEffect(() => {
    (window as any).navigateToLogin = navigateToLogin;
  }, []);

  // Definir nome do perfil ao carregar se já estiver selecionado
  useEffect(() => {
    if (selectedProfile) {
      const profileNames: Record<string, string> = {
        'geral': 'Geral',
        'filial-sul': 'Filial Sul'
      };
      (window as any).currentProfileName = profileNames[selectedProfile] || selectedProfile;
    }
  }, [selectedProfile]);

  // AGORA SIM PODEMOS TER RETURNS CONDICIONAIS

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mostrar landing page se não estiver autenticado e não estiver na página de login
  if (!isAuthenticated && !showLogin) {
    return <Landing />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleProfileSelect = (profileId: string) => {
    selectProfile(profileId);
    // Definir nome do perfil globalmente para exibição
    const profileNames: Record<string, string> = {
      'geral': 'Geral',
      'filial-sul': 'Filial Sul'
    };
    (window as any).currentProfileName = profileNames[profileId] || profileId;
    // Navegar para dashboard após selecionar perfil
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    // Mostrar seletor de perfil se autenticado mas sem perfil selecionado
    if (!selectedProfile) {
      return <ProfileSelector onSelectProfile={handleProfileSelect} />;
    }
    
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <Accounts />;
      case 'transactions':
        return <Transactions />;
      // Notas Fiscais
      case 'invoices':
      case 'invoices-received':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notas Fiscais Recebidas</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'invoices-issued':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notas Fiscais Emitidas</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'invoices-pending':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notas Fiscais Pendentes</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      
      // Pagamentos
      case 'payments':
      case 'payments-scheduled':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagamentos Agendados</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'payments-completed':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagamentos Concluídos</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'payments-new':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Novo Pagamento</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      
      // Relatórios
      case 'reports':
      case 'reports-financial':
        return <ReportsFinancial />;
      case 'reports-analytics':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relatórios de Análises</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'reports-tax':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relatórios Fiscais</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'reports-custom':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relatórios Personalizados</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
