describe("Tables/TableDefaultExpandingOptionsFromTheme", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/TableDefaultExpandingOptionsFromTheme");
        cy.waitForQueryCount(1);
    });

    it("Default expand options from theme", () => {

        // No auto expand yet, assert height
        cy.getWidget("ww0").assertCssPx("height", 160);

        // Go back to another report, else the theme changes won't apply.
        cy.openViewerTestReport("Tables/Table drilldown and on row click", true);
        cy.waitForQueryCount(1);

        // Now open report and change the theme
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                return new Promise(resolve => reporting.openReport({
                    path: 'shared:/Tests/Tables/TableDefaultExpandingOptionsFromTheme',
                    onDefinition: (report: any) => {
                        report.setChangeThemeCallback((theme: any) => {
                            theme.palette.ic3.pageBackgroundColor = "rgb(255, 0, 0)";
                            theme.ic3.widgetDefaults = {
                                box: {
                                    ic3: {
                                        Table: {
                                            withHeader: false,
                                            autoExpandContent: {
                                                active: true
                                            }
                                        }
                                    }
                                }
                            };
                        });
                    },
                    onSuccess: () => {
                        resolve(true);
                    }
                }, false));
            })
            .then(() => {

                cy.get(".ic3LayoutPage-root").should("have.css", "background-color", "rgb(255, 0, 0)");
                cy.waitForQueryCount(2);

                // Expanded height
                cy.getWidget("ww0").assertCssPx("height", 312);

            });

    });

});
