/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: any) => {

    require('cypress-log-to-output').install(on, (type: any, event: any) => {
        if (event.level === 'error' || event.type === 'error' || event.subtype === 'error') {
            return true;
        }

        return false;
    })
    // or, if there is already a before:browser:launch handler, use .browserLaunchHandler inside of it
    // @see https://github.com/flotwig/cypress-log-to-output/issues/5

}