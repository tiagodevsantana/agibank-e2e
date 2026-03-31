// Comandos customizados do Cypress
// Adicione aqui comandos reutilizáveis entre os testes

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Abre o campo de busca clicando no ícone de lupa
       */
      abrirCampoBusca(): Chainable<void>

      /**
       * Realiza uma busca no blog com o termo informado
       * @param termo - Termo a ser pesquisado
       */
      realizarBusca(termo: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('abrirCampoBusca', () => {
  cy.get('.ast-search-menu-icon').click()
  cy.get('input.search-field').should('be.visible')
})

Cypress.Commands.add('realizarBusca', (termo: string) => {
  cy.abrirCampoBusca()
  cy.get('input.search-field').type(`${termo}{enter}`)
})
