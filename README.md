# 🏦 Sistema Gerenciador Financeiro PJ - CAIXA

Sistema web completo de gerenciamento financeiro para pessoas jurídicas do banco CAIXA.

---

## 🚀 Stack Tecnológica

- **React 18** - Biblioteca JavaScript moderna
- **Vite** - Build tool ultrarrápido
- **TypeScript** - Tipagem estática e segurança
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes acessíveis e customizáveis
- **Recharts** - Biblioteca de gráficos interativos

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** (recomendado) ou npm/yarn

### Instalar pnpm (se não tiver):

```bash
npm install -g pnpm
```

---

## ⚙️ Instalação e Execução

### 1. Extrair o arquivo ZIP

Extraia o conteúdo do arquivo `caixa-pj-financeiro-source.zip` em uma pasta de sua preferência.

### 2. Instalar dependências

Abra o terminal na pasta do projeto e execute:

```bash
pnpm install
```

Ou se preferir usar npm:

```bash
npm install
```

### 3. Executar em modo desenvolvimento

```bash
pnpm run dev
```

Ou com npm:

```bash
npm run dev
```

O sistema estará disponível em: **http://localhost:5173**

### 4. Build para produção

```bash
pnpm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### 5. Preview da build de produção

```bash
pnpm run preview
```

---

## 📂 Estrutura do Projeto

```
caixa-pj-financeiro/
├── public/                      # Arquivos públicos estáticos
│   └── login-demo.html         # Página demo de login standalone
├── src/
│   ├── components/             # Componentes React
│   │   ├── ui/                # Componentes Shadcn/ui
│   │   ├── Layout.tsx         # Layout principal com sidebar
│   │   └── Login.tsx          # Componente de login
│   ├── contexts/              # React Context
│   │   └── AuthContext.tsx    # Context de autenticação
│   ├── pages/                 # Páginas do sistema
│   │   ├── Landing.tsx        # Página inicial (landing page)
│   │   ├── Dashboard.tsx      # Dashboard principal
│   │   ├── Accounts.tsx       # Gestão de contas
│   │   ├── Transactions.tsx   # Transações
│   │   └── ReportsFinancial.tsx # Relatórios financeiros
│   ├── services/              # Serviços e dados mock
│   │   └── mockData.ts        # Dados mockados
│   ├── types/                 # Interfaces TypeScript
│   │   └── index.ts           # Definições de tipos
│   ├── App.tsx                # Componente raiz
│   ├── App.css                # Estilos globais
│   ├── main.tsx               # Entry point
│   └── index.css              # Imports do Tailwind
├── components.json            # Configuração Shadcn/ui
├── tsconfig.json              # Configuração TypeScript
├── tailwind.config.js         # Configuração Tailwind
├── vite.config.ts             # Configuração Vite
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

---

## 🎯 Funcionalidades

### ✅ Página Landing Inicial
- Hero section com call-to-actions
- Cards de funcionalidades
- Seção de benefícios
- Estatísticas
- Footer completo

### ✅ Autenticação
- Login com CPF e senha
- Máscara automática no CPF
- Autenticação biométrica (se disponível)
- Botão "Abra sua conta"

### ✅ Dashboard
- 4 cards de resumo financeiro
- Gráfico de receitas vs despesas
- Gráfico de distribuição de saldo
- Transações recentes
- Alertas e pendências

### ✅ Gestão de Contas
- Saldo total consolidado
- 3 contas bancárias
- Botão ocultar saldos
- Informações detalhadas

### ✅ Transações
- Filtros avançados (busca, tipo, status)
- Totais dinâmicos
- Tabela completa
- 8 transações mockadas

### ✅ Sistema de Navegação
- Menu hierárquico com submenus
- Notas Fiscais (3 submenus)
- Relatórios (4 submenus)
- Navegação intuitiva

---

## 🔐 Credenciais de Teste

**Para fazer login, use:**
- **CPF**: Qualquer CPF (ex: 123.456.789-00)
- **Senha**: Qualquer senha

O sistema aceita qualquer CPF e senha para demonstração.

---

## 🎨 Personalização

### Cores

As cores principais estão definidas no Tailwind CSS:
- **Azul CAIXA**: `blue-900` (#1e3a8a)
- **Laranja**: `orange-500` (#f97316)

Para alterar, edite `tailwind.config.js`

### Componentes

Os componentes Shadcn/ui estão em `src/components/ui/` e podem ser personalizados individualmente.

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build de produção
pnpm run build

# Preview da build
pnpm run preview

# Lint (se configurado)
pnpm run lint
```

---

## 🔧 Configuração de Ambiente

O projeto não requer variáveis de ambiente para execução local, pois usa dados mockados.

Para integração com backend real, crie um arquivo `.env`:

```env
VITE_API_URL=https://sua-api.com
VITE_API_KEY=sua-chave-api
```

E acesse via `import.meta.env.VITE_API_URL`

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Execute na pasta do projeto:
```bash
vercel
```

### Netlify

1. Instale a CLI do Netlify:
```bash
npm i -g netlify-cli
```

2. Execute:
```bash
netlify deploy --prod
```

### Build manual

```bash
pnpm run build
```

Faça upload da pasta `dist/` para qualquer servidor web ou CDN.

---

## 🐛 Solução de Problemas

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
pnpm install
```

### Porta 5173 já em uso

```bash
# Especificar outra porta
pnpm run dev -- --port 3000
```

### Erro de TypeScript

```bash
# Verificar versão do Node.js
node --version  # Deve ser 18+

# Reinstalar TypeScript
pnpm add -D typescript
```

---

## 📚 Documentação Adicional

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

---

## 🤝 Suporte

Para dúvidas ou problemas:
- Verifique a seção de Solução de Problemas acima
- Consulte a documentação das tecnologias utilizadas
- Entre em contato com o desenvolvedor

---

## 📄 Licença

© 2025 CAIXA Econômica Federal - Todos os direitos reservados

---

## ✨ Próximos Passos

Para evoluir o sistema:

1. **Integrar com Backend Real**
   - Substituir dados mockados por chamadas API
   - Implementar autenticação JWT
   - Conectar com banco de dados

2. **Adicionar Testes**
   - Unit tests com Vitest
   - Component tests com Testing Library
   - E2E tests com Playwright

3. **Melhorias de Performance**
   - Code splitting
   - Lazy loading de rotas
   - Service Workers (PWA)

4. **Novas Funcionalidades**
   - Exportação de relatórios (PDF, Excel)
   - Upload de documentos
   - Notificações em tempo real
   - Chat de suporte

---

**Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS + Shadcn/ui**
