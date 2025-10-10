# 🏦 Gerenciador Financeiro PJ - CAIXA

Sistema de gerenciamento financeiro para pessoas jurídicas da CAIXA Econômica Federal.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## 📋 Sobre o Projeto

Protótipo funcional de um sistema web moderno para gerenciamento financeiro corporativo, desenvolvido com as melhores práticas e tecnologias atuais.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação Múltipla**: QR Code, Biometria, CPF/Senha
- 👤 **Perfis de Acesso**: Geral, Filial Sul, Criar novo perfil
- 📊 **Dashboard Completo**: Visão consolidada das finanças
- 💰 **Gestão de Contas**: Múltiplas contas bancárias
- 💸 **Transações**: Histórico completo com filtros avançados
- 💳 **Pagamentos**: 4 métodos (Código de barras, PIX Copia e Cola, PIX QR Code, Digitação manual)
- 📄 **Notas Fiscais**: Recebidas, Emitidas, Pendentes
- 📈 **Relatórios**: Financeiro, Análises, Fiscal, Personalizados
- 🌐 **Status Jornada**: FAB button em todas as telas

## 🚀 Stack Tecnológica

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes React acessíveis e customizáveis
- **Recharts** - Biblioteca de gráficos
- **Lucide React** - Ícones modernos
- **QRCode.react** - Geração de QR Codes

### Ferramentas
- **pnpm** - Gerenciador de pacotes
- **ESLint** - Linter JavaScript/TypeScript
- **PostCSS** - Processador CSS

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/Guilherme07/gerenciadorpj.git
cd gerenciadorpj
```

2. Instale as dependências:
```bash
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
pnpm run dev
```

4. Acesse: http://localhost:5173

## 🏗️ Build para Produção

```bash
pnpm run build
```

Os arquivos otimizados estarão em `dist/`.

## 📁 Estrutura do Projeto

```
caixa-pj-financeiro/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── ui/          # Componentes Shadcn/ui
│   │   ├── FAB.tsx      # Floating Action Button
│   │   ├── Layout.tsx   # Layout principal
│   │   ├── Login.tsx    # Tela de login
│   │   └── ProfileSelector.tsx
│   ├── contexts/        # Contextos React
│   │   └── AuthContext.tsx
│   ├── pages/           # Páginas do sistema
│   │   ├── Dashboard.tsx
│   │   ├── Accounts.tsx
│   │   ├── Transactions.tsx
│   │   ├── PaymentsMake.tsx
│   │   ├── Landing.tsx
│   │   └── ReportsFinancial.tsx
│   ├── services/        # Serviços e dados mock
│   │   └── mockData.ts
│   ├── types/           # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Entry point
├── public/              # Arquivos estáticos
├── dist/                # Build de produção
└── package.json
```

## 🎨 Funcionalidades Detalhadas

### 🔐 Autenticação
- **QR Code**: Escaneie com o app CAIXA
- **Biometria**: Face ID, Touch ID, Windows Hello
- **CPF e Senha**: Login tradicional
- **Abrir Conta PJ**: Cadastro de nova empresa

### 💳 Realizar Pagamentos
1. **Código de Barras**
   - Digitação manual
   - Leitura por leitora
   - Upload de boleto (PDF/imagem)

2. **PIX Copia e Cola**
   - Campo de texto
   - Botão "Colar" integrado

3. **PIX QR Code**
   - Upload de imagem
   - Leitura por câmera

4. **Digitação Manual**
   - 10 tipos de pagamento
   - Formulários dinâmicos

### 📊 Dashboard
- Cards de resumo financeiro
- Gráficos interativos (Receitas vs Despesas)
- Distribuição de saldo por conta
- Transações recentes
- Alertas e pendências

### 💰 Contas
- Saldo total consolidado
- Múltiplas contas (Corrente, Poupança, Investimento)
- Botão "Ocultar Saldos"
- Informações de segurança

### 💸 Transações
- Filtros avançados (busca, tipo, status)
- Totais dinâmicos
- Tabela completa
- Indicadores visuais

## 🎯 Credenciais de Teste

Para acessar o sistema em modo de demonstração:
- **CPF**: Qualquer CPF válido (ex: 123.456.789-00)
- **Senha**: Qualquer senha
- **QR Code**: Funcional (pode ser escaneado)
- **Biometria**: Simulada (funciona se disponível no dispositivo)

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build de produção
pnpm run build

# Preview do build
pnpm run preview

# Lint
pnpm run lint
```

## 🌐 Deploy

O projeto está configurado para deploy em:
- Vercel
- Netlify
- GitHub Pages
- Qualquer servidor estático

## 📝 Roadmap

### ✅ Implementado
- [x] Landing page institucional
- [x] Sistema de autenticação
- [x] Seleção de perfis
- [x] Dashboard completo
- [x] Gestão de contas
- [x] Transações com filtros
- [x] Realizar pagamentos (4 métodos)
- [x] FAB "Status Jornada"
- [x] Sticky header na landing

### 🔄 Em Desenvolvimento
- [ ] Consultar pagamentos
- [ ] Pagamentos pendentes
- [ ] Pagamentos via arquivo
- [ ] Acessar DDA
- [ ] Gerenciar limites
- [ ] Notas fiscais (todas as seções)
- [ ] Relatórios (Análises, Fiscal, Personalizados)

### 🎯 Futuro
- [ ] Integração com backend real
- [ ] APIs de pagamento
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Modo escuro
- [ ] Aplicativo mobile (React Native)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um protótipo desenvolvido para fins de demonstração.

## 👥 Autores

- **Desenvolvimento**: Manus AI
- **Design**: Baseado na identidade visual CAIXA

## 📞 Suporte

Para dúvidas ou sugestões:
- Abra uma [Issue](https://github.com/Guilherme07/gerenciadorpj/issues)
- Entre em contato através do repositório

---

**⚠️ Aviso**: Este é um protótipo funcional desenvolvido para demonstração. Não contém integração com sistemas reais da CAIXA e utiliza dados mockados.

**🎨 Desenvolvido com** ❤️ **usando React + TypeScript + Tailwind CSS**

