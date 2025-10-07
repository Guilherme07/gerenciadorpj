import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Accounts } from '@/pages/Accounts';
import { Transactions } from '@/pages/Transactions';
import { ReportsFinancial } from '@/pages/ReportsFinancial';
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

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

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
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
