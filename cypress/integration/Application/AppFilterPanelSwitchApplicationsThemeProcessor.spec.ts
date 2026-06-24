import {PluginThemeUtils} from "../demo/pluginTheme/PluginThemeUtils";

export {};

describe("Application/Switch Applications Theme Processor", () => {

    afterEach(() => {

        PluginThemeUtils.enablePluginTheme(false);

    });

    beforeEach(() => {

        PluginThemeUtils.enablePluginTheme();

        cy.login();
        cy.openAppTestReport("FilterPanel theme processor");
    });

    it("Theme processor", () => {

        cy.waitForQueryCount(0);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Theme/Theme_processor',
                    onDefinition: (report: any) => {

                        report.setThemeProcessorCall({
                            name: "test-processor",
                            params: {
                                textColor: 'rgb(255, 0, 0)'
                            }
                        });

                    }
                }, undefined, true);
                cy.waitForQueryCount(1);

                // Assert red title
                cy.get('h6.ic3FilterPanel-title-text').should('have.css', 'color', 'rgb(255, 0, 0)');

            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Theme/Theme_processor init',
                    onDefinition: (report: any) => {

                        report.setChangeThemeCallback((theme: any) => {
                            theme.palette.text.primary = "rgb(0, 255, 0)";
                        });
                    }
                }, undefined, true);
                cy.waitForQueryCount(1);  // No new queries

                // Assert green title
                cy.get('h6.ic3FilterPanel-title-text').should('have.css', 'color', 'rgb(0, 255, 0)');

            });

    });

});
