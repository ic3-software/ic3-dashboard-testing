export {};

function assertTableIsUnfiltered(wTable: string) {
    cy.assertTableValue(wTable, 0, 1, "€29,500");
    cy.assertTableValue(wTable, 1, 1, "€12,000");
    cy.assertTableValue(wTable, 2, 1, "€67,750");
}

describe("Application/FilterPanel & eventAtStart/Switch Dashboards", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("Empty Filter Panel", () => {

        cy.waitForQueryCount(1);

        // Tests opening an application and changing the report. Tests if the filter panel remains applied.

        const wPanel = "!appFilterPanel";
        const wTable = "ww0"
        cy.panelFilterRemove(wPanel, 0);
        cy.waitForQueryCount(2);
        assertTableIsUnfiltered(wTable);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Tables/Table Sort_testA',
                }, undefined, true);
                cy.waitForQueryCount(3);
            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Application/ForEventAtStartTest',
                }, undefined, true);
                cy.waitForQueryCount(4);
            });

        // Global filter should remain empty.
        assertTableIsUnfiltered(wTable);
    });

});

function assertTableIsJanApr(wTable: string) {
    cy.assertTableValue(wTable, 0, 1, "");
    cy.assertTableValue(wTable, 1, 1, "");
    cy.assertTableValue(wTable, 2, 1, "€2,250");
    cy.assertTableValue(wTable, 3, 1, "€250");
    cy.assertTableValue(wTable, 4, 1, "€1,000");
    cy.assertTableValue(wTable, 5, 1, "€250");
}

describe("Application/FilterPanel One Filter & Change report", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("Test filter in filter panel", () => {

        cy.waitForQueryCount(1);

        /*
        Tests opening an application and changing the report. Tests if the filter panel remains applied.
         */

        const wPanel = "!appFilterPanel";
        const wTable = "ww0"
        cy.panelFilterSetSelection(wPanel, 0, ['2018 Jan']);  // Add 2018 Jan to filter
        cy.waitForQueryCount(2);
        assertTableIsJanApr(wTable);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Tables/Table Sort_testA',
                }, undefined, true);
                cy.waitForQueryCount(3);
            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/Application/ForEventAtStartTest',
                }, undefined, true);
                cy.waitForQueryCount(4);
            });

        // Global filter should remain {2018 Jan, 2018 Apr}.
        assertTableIsJanApr(wTable);
    });

});
