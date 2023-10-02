const {defineConfig} = require('cypress')
const {cloudPlugin} = require("cypress-cloud/plugin");

module.exports = defineConfig({

    e2e: {

        // it's in pRun.js.disabled

        setupNodeEvents: cloudPlugin
    }
})