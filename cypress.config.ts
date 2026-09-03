import {defineConfig} from "cypress";
import {readPdf} from "./cypress/scripts/readPdf";

const dotenvJSON = require("dotenv-json");
dotenvJSON({path: "cypress.env.json"});

export default defineConfig({

    e2e: {

        expose: {
            ic3_user: process.env.ic3_user,
            baseUrl: process.env.baseUrl,
            sc_cloudServiceUrl: process.env.sc_cloudServiceUrl,
            sc_projectId: process.env.sc_projectId,
            // add other public values here
        },

        reporter: 'Spec',

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
            require('cypress-failed-log/on')(on)
        },

        numTestsKeptInMemory: 2
    }
})