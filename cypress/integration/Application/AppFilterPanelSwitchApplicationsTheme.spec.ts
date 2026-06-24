export {};

describe("Application/Switch Applications Theme", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("Theme change callback", () => {

        cy.waitForQueryCount(1);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Tables/Table Sort_testA',
                    onDefinition: (report: any) => {

                        report.setChangeThemeCallback((theme: any) => {
                            theme.palette.text.primary = "rgb(255, 0, 0)";
                        });
                    }
                }, undefined, true);
                cy.waitForQueryCount(2);

                // Assert red title
                cy.get('h6.ic3FilterPanel-title-text').should('have.css', 'color', 'rgb(255, 0, 0)');

            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Tables/Table Sort_testA',
                    onDefinition: (report: any) => {

                        report.setChangeThemeCallback((theme: any) => {
                            theme.palette.text.primary = "rgb(0, 255, 0)";
                        });
                    }
                }, undefined, true);
                cy.waitForQueryCount(3);

                // Assert green title
                cy.get('h6.ic3FilterPanel-title-text').should('have.css', 'color', 'rgb(0, 255, 0)');

            });

    });

});
