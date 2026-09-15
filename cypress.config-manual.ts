import {defineConfig} from "cypress";
import {readPdf} from "./cypress/scripts/readPdf";

export default defineConfig({

    e2e: {

        reporter: "reporters/custom.js",
        reporterOptions: {},

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "cypress/**/OpenWithState.spec.ts",
            "cypress/**/GoogleMap.spec.ts",
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
        },
    }
})