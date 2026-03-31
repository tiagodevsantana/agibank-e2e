# Agibank – Teste Técnico QA Web

Projeto de automação de testes end-to-end para o [Blog do Agi](https://blogdoagi.com.br/), desenvolvido como parte do teste técnico para a posição de QA.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^15 | Framework de automação E2E |
| [TypeScript](https://www.typescriptlang.org/) | ^5.5 | Tipagem estática e maior qualidade de código |
| Node.js | ≥ 18 | Ambiente de execução |

---

## Estrutura do Projeto

```
Agibank/
├── cypress/
│   ├── e2e/
│   │   └── blog-search.cy.ts   # Casos de teste da busca do blog
│   ├── support/
│   │   ├── commands.ts         # Comandos customizados (cy.realizarBusca, etc.)
│   │   └── e2e.ts              # Arquivo de suporte global
│   └── tsconfig.json           # Configuração TypeScript exclusiva do Cypress
├── src/
│   └── index.ts
├── cypress.config.ts           # Configuração central do Cypress
├── package.json
├── tsconfig.json
└── README.md
```

---

## Funcionalidade Testada

**Pesquisa de artigos** – campo de busca acessível através do ícone de **lupa** no canto superior direito do blog.

O fluxo testado é:

```
Usuário clica na lupa → campo de busca aparece → usuário digita o termo → pressiona Enter → página de resultados é exibida
```

---

## Cenários de Teste

### CT01 – Busca com Termo Válido

**Objetivo:** Verificar que a busca com um termo existente retorna artigos relevantes.

**Pré-condição:** O usuário está na página inicial do blog.

| Passo | Ação | Resultado Esperado |
|---|---|---|
| 1 | Acessar `https://blogdoagi.com.br/` | Página carrega com sucesso |
| 2 | Verificar ícone de lupa | Lupa visível no canto superior direito |
| 3 | Clicar na lupa | Campo de busca é exibido |
| 4 | Digitar `"poupança"` | Texto é inserido no campo |
| 5 | Pressionar Enter | Redireciona para `?s=poupança` |
| 6 | Verificar resultados | Ao menos um artigo é listado |
| 7 | Verificar card do artigo | Título visível com link clicável |

**Critério de aceite:** A página de resultados exibe artigos com título e link para cada resultado encontrado.

---

### CT02 – Busca com Termo Inválido (Sem Resultados)

**Objetivo:** Verificar que a busca com um termo inexistente exibe a mensagem de "nenhum resultado encontrado".

**Pré-condição:** O usuário está na página inicial do blog.

| Passo | Ação | Resultado Esperado |
|---|---|---|
| 1 | Acessar `https://blogdoagi.com.br/` | Página carrega com sucesso |
| 2 | Clicar na lupa | Campo de busca é exibido |
| 3 | Digitar `"xyzabctermoquenadaexiste123"` | Texto é inserido no campo |
| 4 | Pressionar Enter | Redireciona para a página de resultados |
| 5 | Verificar ausência de artigos | Nenhum card `.ast-article-post` exibido |
| 6 | Verificar mensagem de feedback | Mensagem de "nenhum resultado" é exibida |

**Critério de aceite:** A página informa ao usuário que nenhum resultado foi encontrado, sem exibir artigos.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm versão 9 ou superior

---

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/tiagodevsantana/Agibank.git
cd Agibank

# 2. Instale as dependências
npm install
```

---

## Como Executar os Testes

### Interface gráfica (recomendado para desenvolvimento)

```bash
npm run cy:open
```

Abre o Cypress Test Runner no navegador, permitindo acompanhar cada passo do teste visualmente.

### Linha de comando (modo headless – CI/CD)

```bash
npm run cy:run
```

Executa todos os testes em segundo plano, sem abrir o navegador. Ideal para pipelines de integração contínua.

### Linha de comando com navegador visível

```bash
npm run cy:run:headed
```

Executa os testes com o navegador visível, útil para depurar falhas.

---

## Comandos Customizados

Foram criados dois comandos customizados em `cypress/support/commands.ts` para facilitar a reutilização:

| Comando | Descrição |
|---|---|
| `cy.abrirCampoBusca()` | Clica na lupa e aguarda o campo de busca aparecer |
| `cy.realizarBusca(termo)` | Abre o campo e digita o termo passado, pressionando Enter |

**Exemplo de uso:**

```typescript
cy.realizarBusca('investimento')
cy.get('.ast-article-post').should('have.length.greaterThan', 0)
```

---

## Decisões Técnicas

**Por que Cypress?**
O Cypress é um framework moderno focado em testes de ponta a ponta para aplicações web. Ele roda diretamente no navegador, possui recarregamento automático, capturas de tela em falhas e uma API fluente e legível.

**Por que TypeScript?**
O TypeScript adiciona tipagem estática ao JavaScript, reduzindo erros em tempo de desenvolvimento, melhorando o IntelliSense na IDE e tornando o código mais legível e manutenível.

**Por que dois `tsconfig.json`?**
O `tsconfig.json` raiz compila o código da pasta `src/`. O `cypress/tsconfig.json` é específico para os testes e inclui os tipos do Cypress (`@types/cypress`), evitando conflitos de tipos entre as duas camadas do projeto.

---

## Autor

**Tiago Santana**
[GitHub](https://github.com/tiagodevsantana/Agibank)
