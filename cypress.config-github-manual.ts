import {defineConfig} from "cypress";

export default defineConfig({

    e2e: {

        supportFile: "cypress/support/e2e.ts",

        specPattern: [
            "**/ButtonsBehavior.spec.ts",
        ],

        excludeSpecPattern: [
            "**/ic3/**/*.spec.ts",
            "**/DatePickerRangeBehavior.spec.ts",
        ],

        retries: {
            runMode: 2,
            openMode: 2,
        },

        reporter: "Min",

        viewportWidth: 1600,
        viewportHeight: 1200,

        video: false,

    }
})