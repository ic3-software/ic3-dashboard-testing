export class PluginThemeUtils {

    public static enablePluginTheme(flag = true) {

        // -------------------------------------------------------------------------------------------------------------
        // Check AppStarter.sanitizeAppOptions
        // Check app-local/ic3report-config.js
        // -------------------------------------------------------------------------------------------------------------

        if (flag) {

            (window as any).Cypress.withMyPluginTheme = true;

        } else {

            delete (window as any).Cypress.withMyPluginTheme;

        }

    }

}