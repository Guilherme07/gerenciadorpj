# 🏦 Gerenciador Financeiro PJ - CAIXA

Sistema completo de gerenciamento financeiro para pessoas jurídicas do banco CAIXA.

## 🚀 Versão Atual: 2.0

### ✨ Novidades desta Versão

#### **Menu Pagamentos Completo (6 Funcionalidades)**

1. **Realizar Pagamentos** 💳
   - 4 métodos: Código de Barras, PIX Copia e Cola, PIX QR Code, Digitação Manual
   - Upload de boletos (PDF/Imagem)
   - Meus Boletos DDA integrado
   - Leitura por máquina leitora

2. **Consultar Pagamentos** 🔍
   - Lista de transações com filtros avançados
   - Detalhes expandíveis
   - Download de comprovantes
   - Consulta de lotes
   - Repetir transação
   - Seleção múltipla para impressão

3. **Pagamentos Pendentes** ⏰
   - Transações iniciadas por outros usuários
   - Pagamentos em lote não concluídos
   - Ações: Concluir, Cancelar, Editar
   - Seleção múltipla
   - Filtros por favorecido, valor, data

4. **Pagamentos via Arquivo** 📤
   - Seleção de convênio bancário
   - Upload de arquivo CNAB 240/400
   - Validação de layout
   - Envio para processamento
   - Consulta remessa/retorno
   - Autorização de arquivos pendentes
   - Timeline de acompanhamento
   - Cancelamento com justificativa
   - Download de comprovantes

5. **Acessar DDA** 📄
   - Gerenciamento de adesão (Ativar/Desativar)
   - Consulta de boletos disponíveis
   - Pagamento individual ou múltiplo
   - Histórico de pagamentos
   - Filtros avançados
   - Download de comprovantes
   - Alertas de vencimento

6. **Gerenciar Limites** ⚙️
   - Visão consolidada de limites
   - 5 tipos: TED/DOC, PIX, Boletos, Lote, Tributos
   - Barras de progresso por consumo
   - Solicitação de aumento/redução
   - Histórico de solicitações
   - Orientações e documentação

---

## 🎯 Funcionalidades Principais

### **Autenticação Moderna**
- 📱 QR Code (APP CAIXA)
- 👆 Biometria (Face ID/Touch ID/Windows Hello)
- 🔐 CPF e Senha

### **Seleção de Perfil**
- 🏢 Perfil Geral
- 📍 Perfil Filial Sul
- ➕ Criar Novo Perfil

### **Dashboard Executivo**
- 📊 4 cards de resumo financeiro
- 📈 Gráficos interativos (Receitas vs Despesas)
- 🥧 Distribuição de saldo por conta
- 📋 Transações recentes
- ⚠️ Alertas e pendências

### **Gestão de Contas**
- 💰 Saldo total consolidado
- 🏦 3 tipos de conta (Corrente, Poupança, Investimento)
- 👁️ Ocultar/Exibir saldos
- 💡 Dicas de segurança

### **Transações**
- 🔍 Filtros avançados (busca, tipo, status)
- 📊 Totais dinâmicos
- 💳 8 transações mockadas
- 🎨 Indicadores visuais

### **Notas Fiscais**
- 📄 3 submenus (Recebidas, Emitidas, Pendentes)

### **Relatórios**
- 📊 4 tipos (Financeiro, Análises, Fiscal, Personalizados)

---

## 🛠️ Stack Tecnológica

- ⚛️ **React 18** - Framework JavaScript
- ⚡ **Vite 6** - Build tool ultrarrápido
- 📘 **TypeScript 5** - Tipagem estática
- 🎨 **Tailwind CSS 3** - Framework CSS utility-first
- 🎭 **Shadcn/ui** - Componentes React reutilizáveis
- 📊 **Recharts** - Biblioteca de gráficos
- 🔐 **QRCode.react** - Geração de QR Codes
- 🎯 **Lucide React** - Ícones modernos

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Guilherme07/gerenciadorpj.git
cd gerenciadorpj

# Instale as dependências
pnpm install
# ou
npm install

# Execute o projeto
pnpm run dev
# ou
npm run dev
```

Acesse: **http://localhost:5173**

---

## 🎮 Como Usar

### **1. Acesse a Landing Page**
- Conheça as funcionalidades
- Clique em "Acessar Gerenciador"

### **2. Faça Login**
- **QR Code**: Escaneie com o APP CAIXA
- **Biometria**: Use Face ID/Touch ID
- **CPF e Senha**: Qualquer CPF e senha (demo)

### **3. Selecione um Perfil**
- Geral (visão consolidada)
- Filial Sul (operações específicas)
- Novo perfil (criar personalizado)

### **4. Explore o Sistema**
- Dashboard com resumo financeiro
- Menu lateral com todas as funcionalidades
- FAB "Status Jornada" (canto inferior direito)

---

## 📊 Dados Mockados

Todos os dados são simulados para demonstração:
- ✅ Transações bancárias
- ✅ Boletos DDA
- ✅ Limites de transação
- ✅ Pagamentos pendentes
- ✅ Arquivos CNAB
- ✅ Comprovantes

---

## 🚀 Deploy

O projeto está configurado para deploy em:
- Vercel
- Netlify
- GitHub Pages
- Qualquer servidor estático

```bash
# Build de produção
pnpm run build

# Preview do build
pnpm run preview
```

---

## 🎯 Roadmap

### **Próximas Funcionalidades**
- [ ] Integração com backend real
- [ ] Autenticação OAuth 2.0
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Modo escuro
- [ ] Aplicativo mobile (React Native)
- [ ] Integração com Open Banking
- [ ] Chatbot de atendimento
- [ ] Análise preditiva com IA

---

## 📄 Licença

Este é um projeto de demonstração desenvolvido para fins educacionais.

---

## 👨‍💻 Desenvolvido por

**Manus AI** - Sistema de Gerenciamento Financeiro PJ CAIXA

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.

🔗 **Repositório**: https://github.com/Guilherme07/gerenciadorpj
