export {};

describe("EmbeddedReports/Filter Panel Smoke Run", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Smoke Run");
        cy.waitForQueryCount(1);
    });

    it("Basics", () => {

        let queryCount = 1;

        const wPanel = "ww0";
        const wTable = "ww1";

        cy.panelFilterAdd(wPanel, "Character", 1);
        cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Contains");
        cy.panelFilterSetTextFieldValue(wPanel, 0, "foo");
        cy.waitForQueryCount(++queryCount);

        cy.panelFilterAdd(wPanel, "Day");
        cy.panelFilterSelectOperatorFromInput(wPanel, 1, "is any of");
        cy.panelFilterSetSelection(wPanel, 1, [/^3 Jan 2015$/, /^1 Jan 2015$/]);
        cy.waitForQueryCount(++queryCount);

        const assertTableWithTwoFilters = () => {
            cy.assertTableRowCount(wTable, 2);
            for (let i = 0; i < 2; i++) {
                cy.assertTableValue(wTable, i, 0, "foo");
            }
            cy.assertTableValue(wTable, 0, 1, "1 Jan 2015");
            cy.assertTableValue(wTable, 1, 1, "3 Jan 2015");
        }
        assertTableWithTwoFilters();

        // Add duplicate filter
        cy.panelFilterAdd(wPanel, "Day");
        cy.panelFilterSelectOperatorFromInput(wPanel, 2, "is any of");
        cy.panelFilterSetSelection(wPanel, 2, [/^1 Jan 2015$/]);
        cy.waitForQueryCount(++queryCount);

        cy.assertTableValue(wTable, 0, 0, "foo");
        cy.assertTableValue(wTable, 0, 1, "1 Jan 2015");

        // Clear second day filter
        cy.panelFilterClear(wPanel, 2);
        assertTableWithTwoFilters();
        cy.waitForQueryCount(++queryCount);

        // Clear character and first day filter
        cy.panelFilterRemove(wPanel, 2);
        cy.panelFilterRemove(wPanel, 0);
        cy.waitForQueryCount(++queryCount);

        cy.assertTableValue(wTable, 0, 0, "foo");
        cy.assertTableValue(wTable, 1, 0, "foo");
        cy.assertTableValue(wTable, 2, 0, "bar");
        cy.assertTableValue(wTable, 3, 0, "bar");
        cy.assertTableValue(wTable, 4, 0, "empty-character");
        cy.assertTableValue(wTable, 5, 0, "empty-character");
        cy.assertTableValue(wTable, 0, 1, "1 Jan 2015");
        cy.assertTableValue(wTable, 1, 1, "3 Jan 2015");
        cy.assertTableValue(wTable, 2, 1, "1 Jan 2015");
        cy.assertTableValue(wTable, 3, 1, "3 Jan 2015");
        cy.assertTableValue(wTable, 4, 1, "1 Jan 2015");
        cy.assertTableValue(wTable, 5, 1, "3 Jan 2015");

    })

});
