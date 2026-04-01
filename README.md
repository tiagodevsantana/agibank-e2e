# Teste Técnico QA – Blog do Agi

Automação dos testes de busca do [Blog do Agi](https://blogdoagi.com.br/), desenvolvida como parte do processo seletivo para a vaga de QA na Agibank.

## Stack

- **Cypress 15** — framework E2E moderno, roda direto no browser e tem ótimo feedback visual
- **TypeScript 5** — tipagem estática e autocomplete nos comandos
- **Node.js 18+**

## Estrutura

```
cypress/
├── e2e/
│   └── blog-search.cy.ts   # casos de teste
└── support/
    ├── commands.ts          # comandos customizados
    └── e2e.ts               # configurações globais
cypress.config.ts            # baseUrl e timeouts
```

## O que está sendo testado

A funcionalidade de busca do blog, acessível pela lupa no canto superior direito.

**CT01 – Busca com termo válido (`"poupança"`)**
Verifica que a busca retorna artigos, que a URL inclui o parâmetro `?s=`, e que o primeiro resultado tem título e link clicáveis.

**CT02 – Busca com termo sem resultados (`"cartoes"`)**
Verifica que a página exibe a mensagem de "nenhum resultado" e que nenhum card de artigo é renderizado.

## Instalação

bash
git clone https://github.com/tiagodevsantana/agibank-e2e.git
cd Agibank
npm install


## Executando os testes

bash
# abre o Cypress com interface visual — bom para desenvolvimento
npm run cy:open

# roda headless, sem abrir navegador — ideal para CI
npm run cy:run

# roda com navegador visível — útil para debugar falhas
npm run cy:run:headed
## Execução dos testes

npm install
npm run test

## Relatório Allure

npm run test:report
npm run allure:open

## Comandos customizados

Dois comandos definidos em `cypress/support/commands.ts`:

typescript
// abre o campo de busca clicando na lupa
cy.abrirCampoBusca()

// navega direto para a página de resultados de um termo
cy.realizarBusca('investimento')


## Decisões que valem comentar

**`{ force: true }` no CT01**
O tema Astra usa `visibility: hidden` na variante `slide-search` para esconder o campo até o dropdown abrir. O Cypress bloqueia interações com elementos não visíveis por padrão, então o `force: true` é necessário para digitar no campo sem esperar a animação.

**`realizarBusca` navega via URL**
Para o CT02, o foco é validar o estado da página sem resultados — não o fluxo de abrir a lupa. Navegar direto via `/?s=termo` é mais estável e direto ao ponto.

**Handler global de exceções**
O blog tem scripts de terceiros (Jetpack, LiteSpeed) que disparam erros de JS não relacionados à funcionalidade testada. O `e2e.ts` ignora esses erros para não contaminar os resultados.

---

Desenvolvido por **Tiago Santana** — [github.com/tiagodevsantana](https://github.com/tiagodevsantana/agibank-e2e)
