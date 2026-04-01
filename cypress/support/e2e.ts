import './commands'
import '@shelex/cypress-allure-plugin';

// Ignora erros de JS de terceiros do WordPress (Jetpack, Astra, LiteSpeed) que não afetam a funcionalidade testada
Cypress.on('uncaught:exception', () => false)
