import {defineConfig} from "cypress";
import {readPdf} from "./cypress/scripts/readPdf";

const cypressSplit = require('cypress-split')

export default defineConfig({

    e2e: {

        reporter: "reporters/custom.js",
        reporterOptions: {},

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "**/*.spec.ts",
        ],

        excludeSpecPattern: [
            "**/ic3/**/*.spec.ts",
            "**/DatePickerRangeBehavior.spec.ts",
            "**/GoogleMap.spec.ts",
        ],

        retries: {
            runMode: 2,
            openMode: 2,
        },

        viewportWidth: 1600,
        viewportHeight: 1200,

        video: false,

        setupNodeEvents(on, config) {
            on('task', {readPdf})
            cypressSplit(on, config)
            return config   // important!
        },
    }
})