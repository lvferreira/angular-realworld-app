const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'baovmg',
  env: {
    email: 'leo.ferreira@mail.io',
    password: 'Wasd@1234',
    apiUrl: 'https://api.realworld.io'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      // const username = process.env.DB_USERNAME
      // const password = process.env.PASSWORD

      // if (!password) {
      //   throw new Error(`missing PASSWORD environment variable`)
      // }

      // config.env = { username, password }
      // return config
    },
    retries: {
      runMode: 1,
      openMode: 0
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
});
