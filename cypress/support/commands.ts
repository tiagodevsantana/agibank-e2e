export {}

declare global {
  namespace Cypress {
    interface Chainable {
      abrirCampoBusca(): Chainable<void>
      realizarBusca(termo: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('abrirCampoBusca', () => {
  cy.get('.ast-search-menu-icon').click({ force: true })
})

Cypress.Commands.add('realizarBusca', (termo: string) => {
  cy.visit(`/?s=${encodeURIComponent(termo)}`)
})
