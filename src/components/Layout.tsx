import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FAB } from '@/components/FAB';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Menu,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  PieChart,
  FileBarChart,
  Download,
  Upload,
  Clock,
  CheckCircle,
  DollarSign,
  Receipt,
  Repeat,
  Zap,
  LineChart,
  PiggyBank,
  Send,
  Banknote,
  Smartphone,
  Users,
  Shield,
  Eye,
  UserPlus,
  FileSearch,
  Calculator,
  Briefcase,
  Landmark,
  TrendingDown,
  CircleDollarSign,
  HandCoins,
  Percent,
  BadgePercent,
  Package,
  ShoppingCart,
  QrCode,
  Barcode,
  UserCircle,
  Bell,
  Palette,
  Lock,
  Key,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  submenu?: {
    id: string;
    label: string;
    icon: any;
  }[];
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);

  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      label: 'Meu CAIXA', 
      icon: LayoutDashboard 
    },
    { 
      id: 'accounts', 
      label: 'Minhas Contas', 
      icon: Wallet,
      submenu: [
        { id: 'accounts-info', label: 'Informações de contas', icon: Info },
        { id: 'accounts-access', label: 'Gerenciar acessos', icon: UserPlus },
      ]
    },
    { 
      id: 'balances', 
      label: 'Saldos e Extratos', 
      icon: LineChart,
      submenu: [
        { id: 'balances-view', label: 'Saldos', icon: DollarSign },
        { id: 'statements-view', label: 'Extratos', icon: FileSearch },
      ]
    },
    { 
      id: 'investments', 
      label: 'Investimentos', 
      icon: TrendingUp,
      submenu: [
        { id: 'investments-apply', label: 'Aplicar e Resgatar', icon: CircleDollarSign },
        { id: 'investments-position', label: 'Minha Posição', icon: PieChart },
        { id: 'investments-statements', label: 'Extratos e Documentos', icon: FileText },
      ]
    },
    { 
      id: 'transfers', 
      label: 'Transferências', 
      icon: Send,
      submenu: [
        { id: 'transfers-make', label: 'Realizar transferências', icon: ArrowLeftRight },
        { id: 'transfers-consult', label: 'Consultar transferências', icon: Receipt },
        { id: 'transfers-limits', label: 'Gerenciar limites', icon: Settings },
      ]
    },
    { 
      id: 'payments', 
      label: 'Pagamentos', 
      icon: CreditCard,
      submenu: [
        { id: 'payments-make', label: 'Realizar pagamentos', icon: DollarSign },
        { id: 'payments-consult', label: 'Consultar pagamentos', icon: Receipt },
        { id: 'payments-pending', label: 'Pagamentos pendentes', icon: Clock },
        { id: 'payments-file', label: 'Pagamentos via arquivo', icon: Upload },
        { id: 'payments-auto-debit', label: 'Pagamentos via Débito Automático', icon: Repeat },
        { id: 'payments-auto-pix', label: 'Pagamentos via PIX Automático', icon: Zap },
        { id: 'payments-dda', label: 'Acessar DDA', icon: FileText },
        { id: 'payments-limits', label: 'Gerenciar limites', icon: Settings },
      ]
    },
    { 
      id: 'loans', 
      label: 'Empréstimos', 
      icon: HandCoins,
      submenu: [
        { id: 'loans-my', label: 'Meus empréstimos', icon: Briefcase },
        { id: 'loans-contract', label: 'Contratar empréstimo', icon: BadgePercent },
      ]
    },
    { 
      id: 'cards', 
      label: 'Cartões', 
      icon: CreditCard,
      submenu: [
        { id: 'cards-credit', label: 'Cartões de crédito', icon: CreditCard },
        { id: 'cards-debit', label: 'Cartões de débito', icon: Wallet },
      ]
    },
    { 
      id: 'pos', 
      label: 'Azulzinha e Maquinhas', 
      icon: Smartphone,
      submenu: [
        { id: 'pos-sales', label: 'Minhas vendas', icon: ShoppingCart },
        { id: 'pos-receivables', label: 'Recebíveis', icon: Banknote },
        { id: 'pos-anticipation', label: 'Antecipação', icon: TrendingDown },
        { id: 'pos-machines', label: 'Minhas maquinhas', icon: QrCode },
        { id: 'pos-reports', label: 'Relatórios', icon: BarChart3 },
      ]
    },
    { 
      id: 'billing', 
      label: 'Cobrança Bancária', 
      icon: Receipt,
      submenu: [
        { id: 'billing-issue', label: 'Emitir boleto', icon: Barcode },
        { id: 'billing-my', label: 'Meus boletos', icon: FileText },
        { id: 'billing-received', label: 'Boletos recebidos', icon: CheckCircle },
        { id: 'billing-agreements', label: 'Convênios', icon: Landmark },
        { id: 'billing-reports', label: 'Relatórios', icon: BarChart3 },
      ]
    },
    { 
      id: 'employer', 
      label: 'Empregador', 
      icon: Users,
      submenu: [
        { id: 'employer-payroll', label: 'Folha de pagamento', icon: Calculator },
        { id: 'employer-fgts', label: 'FGTS', icon: PiggyBank },
        { id: 'employer-employees', label: 'Colaboradores', icon: Users },
        { id: 'employer-benefits', label: 'Benefícios', icon: Package },
        { id: 'employer-reports', label: 'Relatórios', icon: BarChart3 },
      ]
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: Settings,
      submenu: [
        { id: 'settings-profile', label: 'Meu perfil', icon: UserCircle },
        { id: 'settings-security', label: 'Segurança', icon: Shield },
        { id: 'settings-notifications', label: 'Notificações', icon: Bell },
        { id: 'settings-appearance', label: 'Aparência', icon: Palette },
        { id: 'settings-access', label: 'Controle de acesso', icon: Key },
      ]
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-blue-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <div>
                <h1 className="text-lg font-bold">CAIXA Empresas</h1>
                <p className="text-xs text-blue-200">Gerenciador Financeiro PJ</p>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-blue-800">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-700 text-white">
                    {user ? getInitials(user.name) : 'JS'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{user?.name || 'João Silva'}</p>
                  <p className="text-xs text-blue-200">{user?.company || 'Empresa Exemplo Ltda'}</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('settings-profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings-security')}>
                <Shield className="mr-2 h-4 w-4" />
                Segurança
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                        </div>
                        {expandedMenus.includes(item.id) ? (
                          <ChevronDown className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        )}
                      </button>
                      {expandedMenus.includes(item.id) && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => onNavigate(subItem.id)}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                                currentPage === subItem.id
                                  ? 'bg-blue-100 text-blue-900 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <subItem.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1">{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left ${
                        currentPage === item.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <FAB />
    </div>
  );
};

