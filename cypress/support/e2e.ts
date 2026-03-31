// Arquivo de suporte global do Cypress
// Importa comandos customizados e configurações globais

import './commands'

// Ignora erros de JS de terceiros do WordPress (Jetpack, Astra, LiteSpeed) que não afetam a funcionalidade testada
Cypress.on('uncaught:exception', () => false)
