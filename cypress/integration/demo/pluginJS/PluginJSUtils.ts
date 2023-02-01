export class PluginJSUtils {

    public static enablePluginJS(flag = true) {

        // -------------------------------------------------------------------------------------------------------------
        // Check AppStarter.sanitizeAppOptions
        // Check app-local/ic3report-config.js
        // -------------------------------------------------------------------------------------------------------------

        if (flag) {

            (window as any).Cypress.withMyPluginJS = true;

        } else {

            delete (window as any).Cypress.withMyPluginJS;

        }

    }

}