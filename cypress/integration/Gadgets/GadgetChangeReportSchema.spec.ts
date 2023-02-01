describe("Gadgets/GadgetChangeReportSchema", () => {

    beforeEach(() => {
        // Open an application, we don't care which
        cy.login();
        cy.openAppTestReport("empty app", false, false);
    });

    it("Without changing schema", () => {

        /*
        changing the schema in a report via the API with a gadget having the same schema should change the
        schema inside the gadget also.
         */

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Gadgets/Schema Change',
                }, false);
            })
            .then(() => {
                // ww0 gives schema not found error
                cy.getWidget("ww0").find("[data-cy='render-error']").should("exist");

                // wg0 and wg1 render
                cy.assertTableCellContent("wg0-0", 0, 0, "Personal");
                cy.assertTableCellContent("wg0-0", 0, 1, "€148,250");
                cy.assertTableCellContent("wg1-0", 0, 0, "2015");
                cy.assertTableCellContent("wg1-0", 0, 1, "10");
                cy.assertTableCellContent("wg1-0", 1, 0, "2016");
                cy.assertTableCellContent("wg1-0", 1, 1, "-10");
            });

    });

    it("Open with different schema", () => {

        cy.wait(100).window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Gadgets/Schema Change',
                    onDefinition: (report: any) => {
                        report.setDefaultSchemaName("Sales");
                    }
                }, false /* Cypress reloads the page when the url changes */);
            })
            .then(() => {

                // Now test that wg0 schema is changed, it gives an error, and wg1 isn't.

                cy.wait(100);

                // Assert schema has changed
                cy.assertTableCellContent("ww0", 0, 0, "Egypt");
                cy.assertTableCellContent("ww0", 0, 1, "34");

                // wg0 gives error
                cy.getWidget("wg0-0").find("[data-cy='render-error']").should("exist");

                // wg1 isn't changed
                cy.assertTableCellContent("wg1-0", 0, 0, "2015");
                cy.assertTableCellContent("wg1-0", 0, 1, "10");
                cy.assertTableCellContent("wg1-0", 1, 0, "2016");
                cy.assertTableCellContent("wg1-0", 1, 1, "-10");

            });
    })

});
