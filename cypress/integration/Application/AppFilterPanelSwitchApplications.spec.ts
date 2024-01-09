export {};

function assertTable_App1_default(wTable: string) {

    cy.assertTableValue(wTable, 0, 1, "");
    cy.assertTableValue(wTable, 1, 1, "");
    cy.assertTableValue(wTable, 2, 1, "€1,250");
    cy.assertTableValue(wTable, 3, 1, "");
    cy.assertTableValue(wTable, 4, 1, "");
    cy.assertTableValue(wTable, 5, 1, "€250");

}

function assertTable_App2_default(wTable: string) {

    cy.assertTableValue(wTable, 0, 1, "");
    cy.assertTableValue(wTable, 1, 1, "€250");
    cy.assertTableValue(wTable, 2, 1, "€2,250");
    cy.assertTableValue(wTable, 3, 1, "");
    cy.assertTableValue(wTable, 4, 1, "");
    cy.assertTableValue(wTable, 5, 1, "");

}

describe("Application/Switch Applications", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("Default Filter Panel", () => {

        cy.waitForQueryCount(1);

        const wTable = "ww0"

        // Tests switching applications keep their initial filter panel

        assertTable_App1_default(wTable);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel & eventAtStart 2',
                });
                cy.waitForQueryCount(2);
                assertTable_App2_default(wTable);
            });

    });

});
