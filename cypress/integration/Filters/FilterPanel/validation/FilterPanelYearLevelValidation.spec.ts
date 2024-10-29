export {};

describe("Filters/Filter Panel Year Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Year Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(4);
    });

    it("event values correct", () => {

        const event1 = "ww5";
        const table1 = "ww20";
        cy.assertEventValue(event1, "{}");
        cy.assertTableRowCount(table1, 0);

        const event2 = "ww9";
        const table2 = "ww22";
        cy.assertEventValue(event2, "");
        cy.assertTableRowCount(table2, 3);  // Shows all data because filter is ill-defined and thus not applied.
        cy.assertTableCellContent(table2, 0, 0, "2015");
        cy.assertTableCellContent(table2, 1, 0, "2016");
        cy.assertTableCellContent(table2, 1, 0, "empty-date");

        const event3 = "ww1";
        const table3 = "ww2";
        cy.assertEventValue(event3, "");
        cy.assertTableRowCount(table3, 3);  // Shows all data because filter is ill-defined and thus not applied.
        cy.assertTableCellContent(table3, 0, 0, "2015");
        cy.assertTableCellContent(table3, 1, 0, "2016");
        cy.assertTableCellContent(table3, 1, 0, "empty-date");

        const event4 = "ww6";
        const table4 = "ww7";
        cy.assertEventValue(event3, "");
        cy.assertTableRowCount(table3, 3);  // Shows all data because filter is ill-defined and thus not applied.
        cy.assertTableCellContent(table3, 0, 0, "2015");
        cy.assertTableCellContent(table3, 1, 0, "2016");
        cy.assertTableCellContent(table3, 1, 0, "empty-date");

    });

});