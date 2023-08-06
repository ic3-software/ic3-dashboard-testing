import {defineConfig} from "cypress";
import {readPdf} from "./cypress/scripts/readPdf";

const dotenvJSON = require("dotenv-json");
dotenvJSON({path: "cypress.env.json"});

export default defineConfig({

    e2e: {

        baseUrl: process.env.baseUrl,

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "**/*.spec.ts"
        ],

        viewportWidth: 1600,
        viewportHeight: 1200,

        video: false,

        setupNodeEvents(on, config) {
            on('task', {readPdf})
        },
    }
})