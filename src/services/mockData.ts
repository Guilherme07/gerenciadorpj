import type { 
  User, 
  Company, 
  BankAccount, 
  Transaction, 
  Invoice, 
  Payment, 
  DashboardStats 
} from '@/types';

// Simula delay de API
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Dados mockados
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao.silva@empresa.com.br',
  role: 'admin',
  company: 'Empresa Exemplo Ltda'
};

export const mockCompany: Company = {
  id: '1',
  cnpj: '12.345.678/0001-90',
  name: 'Empresa Exemplo Ltda',
  fantasyName: 'Exemplo Corp',
  accounts: [
    {
      id: 'acc1',
      accountNumber: '12345-6',
      agency: '0001',
      type: 'checking',
      balance: 285430.50,
      currency: 'BRL'
    },
    {
      id: 'acc2',
      accountNumber: '78901-2',
      agency: '0001',
      type: 'savings',
      balance: 150000.00,
      currency: 'BRL'
    },
    {
      id: 'acc3',
      accountNumber: '34567-8',
      agency: '0001',
      type: 'investment',
      balance: 500000.00,
      currency: 'BRL'
    }
  ]
};

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    date: '2025-10-07',
    description: 'Pagamento Cliente XYZ',
    amount: 15000.00,
    type: 'credit',
    category: 'Receita',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx2',
    date: '2025-10-06',
    description: 'Folha de Pagamento',
    amount: 45000.00,
    type: 'debit',
    category: 'Salários',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx3',
    date: '2025-10-05',
    description: 'Fornecedor ABC',
    amount: 8500.00,
    type: 'debit',
    category: 'Fornecedores',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx4',
    date: '2025-10-04',
    description: 'Venda de Produtos',
    amount: 32000.00,
    type: 'credit',
    category: 'Receita',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx5',
    date: '2025-10-03',
    description: 'Aluguel',
    amount: 12000.00,
    type: 'debit',
    category: 'Despesas Fixas',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx6',
    date: '2025-10-02',
    description: 'Serviços Prestados',
    amount: 25000.00,
    type: 'credit',
    category: 'Receita',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx7',
    date: '2025-10-01',
    description: 'Energia Elétrica',
    amount: 3500.00,
    type: 'debit',
    category: 'Despesas Fixas',
    status: 'completed',
    accountId: 'acc1'
  },
  {
    id: 'tx8',
    date: '2025-09-30',
    description: 'Transferência Recebida',
    amount: 18000.00,
    type: 'credit',
    category: 'Receita',
    status: 'pending',
    accountId: 'acc1'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    number: 'NF-2025-001',
    issueDate: '2025-10-01',
    dueDate: '2025-10-15',
    amount: 25000.00,
    status: 'pending',
    client: 'Cliente ABC Ltda',
    description: 'Serviços de consultoria'
  },
  {
    id: 'inv2',
    number: 'NF-2025-002',
    issueDate: '2025-10-03',
    dueDate: '2025-10-20',
    amount: 15000.00,
    status: 'pending',
    client: 'Cliente XYZ S.A.',
    description: 'Venda de produtos'
  },
  {
    id: 'inv3',
    number: 'NF-2025-003',
    issueDate: '2025-09-25',
    dueDate: '2025-10-10',
    amount: 32000.00,
    status: 'paid',
    client: 'Cliente DEF Corp',
    description: 'Projeto de desenvolvimento'
  },
  {
    id: 'inv4',
    number: 'NF-2025-004',
    issueDate: '2025-09-20',
    dueDate: '2025-10-05',
    amount: 18000.00,
    status: 'overdue',
    client: 'Cliente GHI Ltda',
    description: 'Manutenção mensal'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    date: '2025-10-10',
    amount: 45000.00,
    recipient: 'Folha de Pagamento',
    status: 'scheduled',
    type: 'ted',
    description: 'Pagamento de salários'
  },
  {
    id: 'pay2',
    date: '2025-10-08',
    amount: 8500.00,
    recipient: 'Fornecedor ABC',
    status: 'scheduled',
    type: 'boleto',
    description: 'Compra de materiais'
  },
  {
    id: 'pay3',
    date: '2025-10-07',
    amount: 3500.00,
    recipient: 'Companhia de Energia',
    status: 'processing',
    type: 'pix',
    description: 'Conta de luz'
  },
  {
    id: 'pay4',
    date: '2025-10-05',
    amount: 12000.00,
    recipient: 'Imobiliária XYZ',
    status: 'completed',
    type: 'ted',
    description: 'Aluguel do escritório'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalBalance: 935430.50,
  monthlyRevenue: 125000.00,
  monthlyExpenses: 72500.00,
  pendingInvoices: 2,
  scheduledPayments: 2
};

// Funções de API simuladas
export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay();
    if (email && password) {
      return {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    throw new Error('Credenciais inválidas');
  },
  
  logout: async (): Promise<void> => {
    await delay(200);
  }
};

export const companyService = {
  getCompany: async (): Promise<Company> => {
    await delay();
    return mockCompany;
  }
};

export const accountService = {
  getAccounts: async (): Promise<BankAccount[]> => {
    await delay();
    return mockCompany.accounts;
  },
  
  getAccountById: async (id: string): Promise<BankAccount | undefined> => {
    await delay();
    return mockCompany.accounts.find(acc => acc.id === id);
  }
};

export const transactionService = {
  getTransactions: async (accountId?: string): Promise<Transaction[]> => {
    await delay();
    if (accountId) {
      return mockTransactions.filter(tx => tx.accountId === accountId);
    }
    return mockTransactions;
  },
  
  getTransactionById: async (id: string): Promise<Transaction | undefined> => {
    await delay();
    return mockTransactions.find(tx => tx.id === id);
  }
};

export const invoiceService = {
  getInvoices: async (): Promise<Invoice[]> => {
    await delay();
    return mockInvoices;
  },
  
  getInvoiceById: async (id: string): Promise<Invoice | undefined> => {
    await delay();
    return mockInvoices.find(inv => inv.id === id);
  }
};

export const paymentService = {
  getPayments: async (): Promise<Payment[]> => {
    await delay();
    return mockPayments;
  },
  
  getPaymentById: async (id: string): Promise<Payment | undefined> => {
    await delay();
    return mockPayments.find(pay => pay.id === id);
  }
};

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    await delay();
    return mockDashboardStats;
  }
};
