// Tipos principais do sistema

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  company: string;
}

export interface Company {
  id: string;
  cnpj: string;
  name: string;
  fantasyName: string;
  accounts: BankAccount[];
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  agency: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
  accountId: string;
}

export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  client: string;
  description: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  recipient: string;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
  type: 'boleto' | 'ted' | 'pix' | 'doc';
  description: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  pendingInvoices: number;
  scheduledPayments: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}
