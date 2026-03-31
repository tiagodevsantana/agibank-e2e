/**
 * Suite de Testes: Pesquisa de Artigos – Blog do Agi
 *
 * Funcionalidade testada: Campo de busca acessível via ícone de lupa
 * no canto superior direito do blog.
 *
 * Cenários cobertos:
 *   CT01 – Busca com termo válido que retorna resultados
 *   CT02 – Busca com termo inválido que não retorna resultados
 */

describe('Pesquisa de Artigos – Blog do Agi', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // ─────────────────────────────────────────────────────────────
  // CT01 – Busca com Termo Válido
  // ─────────────────────────────────────────────────────────────
  describe('CT01 – Busca com termo válido', () => {
    const TERMO_VALIDO = 'poupança'

    it('deve exibir o ícone de lupa na barra de navegação', () => {
      cy.get('.ast-search-menu-icon').should('be.visible')
    })

    it('deve abrir o campo de busca ao clicar na lupa', () => {
      cy.get('.ast-search-menu-icon').click()
      cy.get('input.search-field').should('be.visible')
    })

    it('deve aceitar digitação no campo de busca', () => {
      cy.abrirCampoBusca()
      cy.get('input.search-field').type(TERMO_VALIDO)
      cy.get('input.search-field').should('have.value', TERMO_VALIDO)
    })

    it('deve redirecionar para a página de resultados ao pesquisar', () => {
      cy.realizarBusca(TERMO_VALIDO)
      cy.url().should('include', `?s=${encodeURIComponent(TERMO_VALIDO)}`)
    })

    it('deve exibir ao menos um artigo nos resultados', () => {
      cy.realizarBusca(TERMO_VALIDO)
      cy.get('.ast-article-post').should('have.length.greaterThan', 0)
    })

    it('cada resultado deve conter título e link clicável', () => {
      cy.realizarBusca(TERMO_VALIDO)
      cy.get('.ast-article-post').first().within(() => {
        cy.get('.entry-title a')
          .should('be.visible')
          .and('have.attr', 'href')
      })
    })
  })

  // ─────────────────────────────────────────────────────────────
  // CT02 – Busca com Termo Inválido (sem resultados)
  // ─────────────────────────────────────────────────────────────
  describe('CT02 – Busca com termo inválido (sem resultados)', () => {
    const TERMO_INVALIDO = 'xyzabctermoquenadaexiste123'

    it('deve redirecionar para a página de resultados ao pesquisar', () => {
      cy.realizarBusca(TERMO_INVALIDO)
      cy.url().should('include', `?s=${TERMO_INVALIDO}`)
    })

    it('deve exibir mensagem de nenhum resultado encontrado', () => {
      cy.realizarBusca(TERMO_INVALIDO)
      cy.get('.no-results, .search-no-results').should('exist')
    })

    it('não deve exibir cards de artigos', () => {
      cy.realizarBusca(TERMO_INVALIDO)
      cy.get('.ast-article-post').should('not.exist')
    })
  })
})
