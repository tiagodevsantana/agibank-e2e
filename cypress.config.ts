import { defineConfig } from 'cypress'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
    e2e: {
        baseUrl: 'https://blogdoagi.com.br',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 30000,
        video: false,
        screenshotOnRunFailure: true,
        screenshotsFolder: 'cypress/screenshots',
        specPattern: 'cypress/e2e/**/*.cy.ts',
        supportFile: 'cypress/support/e2e.ts',

        setupNodeEvents(on, config) {
            allureWriter(on, config)
            return config
        },
    },

    env: {
        allure: true,
        allureResultsPath: "allure-results"
    }
})