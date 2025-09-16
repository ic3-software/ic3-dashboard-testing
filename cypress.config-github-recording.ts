import {defineConfig} from "cypress";
import {readPdf} from "./cypress/scripts/readPdf";

export default defineConfig({

    e2e: {

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "**/DefaultEventNames.spec.ts"
        ],

        excludeSpecPattern: [
            "**/ic3/**/*.spec.ts"
        ],

        retries: {
            runMode: 2,
            openMode: 2,
        },

        reporter: 'Spec',

        viewportWidth: 1600,
        viewportHeight: 1200,

        video: false,

        setupNodeEvents(on, config) {
            on('task', {readPdf})
        },
    }
})
