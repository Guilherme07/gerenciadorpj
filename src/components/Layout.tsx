import React, { useState } from 'react';
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
  Receipt
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
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['reports']);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Contas', icon: Wallet },
    { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
    { 
      id: 'invoices', 
      label: 'Notas Fiscais', 
      icon: FileText,
      submenu: [
        { id: 'invoices-received', label: 'Recebidas', icon: Download },
        { id: 'invoices-issued', label: 'Emitidas', icon: Upload },
        { id: 'invoices-pending', label: 'Pendentes', icon: Clock },
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
        { id: 'payments-dda', label: 'Acessar DDA', icon: FileText },
        { id: 'payments-limits', label: 'Gerenciar limites', icon: Settings },
      ]
    },
    { 
      id: 'reports', 
      label: 'Relatórios', 
      icon: BarChart3,
      submenu: [
        { id: 'reports-financial', label: 'Financeiro', icon: TrendingUp },
        { id: 'reports-analytics', label: 'Análises', icon: PieChart },
        { id: 'reports-tax', label: 'Fiscal', icon: Receipt },
        { id: 'reports-custom', label: 'Personalizados', icon: FileBarChart },
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

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const isParentActive = (item: MenuItem) => {
    if (currentPage === item.id) return true;
    if (item.submenu) {
      return item.submenu.some(sub => currentPage === sub.id);
    }
    return false;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-800 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">CAIXA Empresas</h1>
                <p className="text-xs text-blue-200">Gerenciador Financeiro PJ</p>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-blue-800">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-orange-500 text-white">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-blue-200">{user?.company}</p>
                  <p className="text-xs text-green-300 font-medium">
                    {(window as any).currentProfileName || 'Perfil não selecionado'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                localStorage.removeItem('selected_profile');
                window.location.reload();
              }}>
                <Building2 className="mr-2 h-4 w-4" />
                Trocar Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:static lg:translate-x-0
            w-64 bg-white shadow-lg h-[calc(100vh-64px)]
            transition-transform duration-300 ease-in-out z-40
            overflow-y-auto
          `}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isParentActive(item);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = isMenuExpanded(item.id);
              
              return (
                <div key={item.id}>
                  {/* Menu Principal */}
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        toggleMenu(item.id);
                      } else {
                        onNavigate(item.id);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }
                    }}
                    className={`
                      w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {hasSubmenu && (
                      isExpanded ? (
                        <ChevronDown className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      ) : (
                        <ChevronRight className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      )
                    )}
                  </button>

                  {/* Submenu */}
                  {hasSubmenu && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                      {item.submenu!.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = currentPage === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onNavigate(subItem.id);
                              if (window.innerWidth < 1024) setSidebarOpen(false);
                            }}
                            className={`
                              w-full flex items-center gap-3 px-4 py-2 rounded-lg
                              transition-all duration-200 text-sm
                              ${isSubActive
                                ? 'bg-blue-900 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                              }
                            `}
                          >
                            <SubIcon className="h-4 w-4" />
                            <span className="font-medium">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Floating Action Button */}
      <FAB />
    </div>
  );
};
