export class PluginReactUtils {

    public static enablePluginReact(flag = true) {

        // -------------------------------------------------------------------------------------------------------------
        // Check AppStarter.sanitizeAppOptions
        // Check app-local/ic3report-config.js
        // -------------------------------------------------------------------------------------------------------------

        if (flag) {

            (window as any).Cypress.withMyPluginReact = true;

        } else {

            delete (window as any).Cypress.withMyPluginReact;

        }

    }

}