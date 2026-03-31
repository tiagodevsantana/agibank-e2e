describe('Pesquisa de Artigos – Blog do Agi', () => {
  describe('CT01 – Busca com termo válido', () => {
    const TERMO = 'poupança'

    beforeEach(() => {
      cy.visit('/')
    })

    it('deve exibir resultados ao buscar por um termo válido', () => {
      cy.get('.ast-search-menu-icon').should('be.visible').click({ force: true })
      cy.get('input.search-field').type(TERMO, { force: true })
      cy.get('input.search-field').closest('form').submit()

      cy.url().should('include', `?s=${encodeURIComponent(TERMO)}`)
      cy.get('.ast-article-post').should('have.length.greaterThan', 0)
      cy.get('.ast-article-post').first().within(() => {
        cy.get('.entry-title a').should('be.visible').and('have.attr', 'href')
      })
    })
  })

  describe('CT02 – Busca com termo inválido', () => {
    const TERMO = 'cartoes'

    beforeEach(() => {
      cy.realizarBusca(TERMO)
    })

    it('deve redirecionar para a página de resultados', () => {
      cy.url().should('include', `?s=${TERMO}`)
    })

    it('deve exibir mensagem de nenhum resultado encontrado', () => {
      cy.get('.no-results, .search-no-results').should('exist')
    })

    it('não deve exibir cards de artigos', () => {
      cy.get('.ast-article-post').should('not.exist')
    })
  })
})
