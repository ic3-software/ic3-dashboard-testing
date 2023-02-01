const {defineConfig} = require('cypress')
const dotenvJSON = require("dotenv-json");

dotenvJSON({path: "cypress.env.json"});

module.exports = defineConfig({

    e2e: {

        baseUrl: process.env.baseUrl,

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "**/*.spec.ts"
        ],

        viewportWidth: 1600,
        viewportHeight: 1200,

        video: false,
    }
})