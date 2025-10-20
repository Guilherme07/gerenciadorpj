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

// Pagamentos
import { PaymentsMake } from '@/pages/PaymentsMake';
import { PaymentsConsult } from '@/pages/PaymentsConsult';
import { PaymentsPending } from '@/pages/PaymentsPending';
import { PaymentsFile } from '@/pages/PaymentsFile';
import { PaymentsDDA } from '@/pages/PaymentsDDA';
import { PaymentsLimits } from '@/pages/PaymentsLimits';
import { PaymentsAutoDebit } from '@/pages/PaymentsAutoDebit';
import { PaymentsAutoPix } from '@/pages/PaymentsAutoPix';

// Contas
import { AccountsInfo } from '@/pages/AccountsInfo';
import { AccountsAccess } from '@/pages/AccountsAccess';

// Saldos e Extratos
import { BalancesView } from '@/pages/BalancesView';
import { StatementsView } from '@/pages/StatementsView';

// Investimentos
import { InvestmentsApply } from '@/pages/InvestmentsApply';
import { InvestmentsPosition } from '@/pages/InvestmentsPosition';
import { InvestmentsStatements } from '@/pages/InvestmentsStatements';

// Transferências
import { TransfersMake } from '@/pages/TransfersMake';
import { TransfersConsult } from '@/pages/TransfersConsult';
import { TransfersLimits } from '@/pages/TransfersLimits';

// Empréstimos
import { LoansMy } from '@/pages/LoansMy';
import { LoansContract } from '@/pages/LoansContract';

// Cartões
import { CardsCredit } from '@/pages/CardsCredit';
import { CardsDebit } from '@/pages/CardsDebit';

// POS (Azulzinha e Maquinhas)
import { PosSales } from '@/pages/PosSales';
import { PosReceivables } from '@/pages/PosReceivables';
import { PosAnticipation } from '@/pages/PosAnticipation';
import { PosMachines } from '@/pages/PosMachines';
import { PosReports } from '@/pages/PosReports';

// Cobrança Bancária
import { BillingIssue } from '@/pages/BillingIssue';
import { BillingMy } from '@/pages/BillingMy';
import { BillingReceived } from '@/pages/BillingReceived';
import { BillingAgreements } from '@/pages/BillingAgreements';
import { BillingReports } from '@/pages/BillingReports';

// Empregador
import { EmployerPayroll } from '@/pages/EmployerPayroll';
import { EmployerFgts } from '@/pages/EmployerFgts';
import { EmployerEmployees } from '@/pages/EmployerEmployees';
import { EmployerBenefits } from '@/pages/EmployerBenefits';
import { EmployerReports } from '@/pages/EmployerReports';

// Configurações
import { SettingsProfile } from '@/pages/SettingsProfile';
import { SettingsSecurity } from '@/pages/SettingsSecurity';
import { SettingsNotifications } from '@/pages/SettingsNotifications';
import { SettingsAppearance } from '@/pages/SettingsAppearance';
import { SettingsAccess } from '@/pages/SettingsAccess';

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
      // Meu CAIXA (Dashboard)
      case 'dashboard':
        return <Dashboard />;
      
      // Minhas Contas
      case 'accounts':
      case 'accounts-info':
        return <AccountsInfo />;
      case 'accounts-access':
        return <AccountsAccess />;
      
      // Saldos e Extratos
      case 'balances':
      case 'balances-view':
        return <BalancesView />;
      case 'statements-view':
        return <StatementsView />;
      
      // Investimentos
      case 'investments':
      case 'investments-apply':
        return <InvestmentsApply />;
      case 'investments-position':
        return <InvestmentsPosition />;
      case 'investments-statements':
        return <InvestmentsStatements />;
      
      // Transferências
      case 'transfers':
      case 'transfers-make':
        return <TransfersMake />;
      case 'transfers-consult':
        return <TransfersConsult />;
      case 'transfers-limits':
        return <TransfersLimits />;
      
      // Pagamentos
      case 'payments':
      case 'payments-make':
        return <PaymentsMake />;
      case 'payments-consult':
        return <PaymentsConsult />;
      case 'payments-pending':
        return <PaymentsPending />;
      case 'payments-file':
        return <PaymentsFile />;
      case 'payments-dda':
        return <PaymentsDDA />;
      case 'payments-limits':
        return <PaymentsLimits />;
      case 'payments-auto-debit':
        return <PaymentsAutoDebit />;
      case 'payments-auto-pix':
        return <PaymentsAutoPix />;
      
      // Empréstimos
      case 'loans':
      case 'loans-my':
        return <LoansMy />;
      case 'loans-contract':
        return <LoansContract />;
      
      // Cartões
      case 'cards':
      case 'cards-credit':
        return <CardsCredit />;
      case 'cards-debit':
        return <CardsDebit />;
      
      // POS (Azulzinha e Maquinhas)
      case 'pos':
      case 'pos-sales':
        return <PosSales />;
      case 'pos-receivables':
        return <PosReceivables />;
      case 'pos-anticipation':
        return <PosAnticipation />;
      case 'pos-machines':
        return <PosMachines />;
      case 'pos-reports':
        return <PosReports />;
      
      // Cobrança Bancária
      case 'billing':
      case 'billing-issue':
        return <BillingIssue />;
      case 'billing-my':
        return <BillingMy />;
      case 'billing-received':
        return <BillingReceived />;
      case 'billing-agreements':
        return <BillingAgreements />;
      case 'billing-reports':
        return <BillingReports />;
      
      // Empregador
      case 'employer':
      case 'employer-payroll':
        return <EmployerPayroll />;
      case 'employer-fgts':
        return <EmployerFgts />;
      case 'employer-employees':
        return <EmployerEmployees />;
      case 'employer-benefits':
        return <EmployerBenefits />;
      case 'employer-reports':
        return <EmployerReports />;
      
      // Configurações
      case 'settings':
      case 'settings-profile':
        return <SettingsProfile />;
      case 'settings-security':
        return <SettingsSecurity />;
      case 'settings-notifications':
        return <SettingsNotifications />;
      case 'settings-appearance':
        return <SettingsAppearance />;
      case 'settings-access':
        return <SettingsAccess />;
      
      // Transações (mantido para compatibilidade)
      case 'transactions':
        return <Transactions />;
      
      // Relatórios (mantido para compatibilidade)
      case 'reports':
      case 'reports-financial':
        return <ReportsFinancial />;
      
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

