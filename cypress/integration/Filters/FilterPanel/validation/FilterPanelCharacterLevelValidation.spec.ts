export {};

describe("Filters/Filter Panel Character Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Character Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(2);
    });

    it("event values correct", () => {

        const event1 = "ww1";
        const table1 = "ww2";
        cy.assertEventValue(event1, "{{},[Character].[Character].[All].&[FOO]}");
        cy.assertTableRowCount(table1, 1);
        cy.assertTableCellContent(table1, 0, 0, "foo");

        const event2 = "ww4";
        const table2 = "ww5";
        cy.assertEventValue(event2, "Except([Character].[Character].[Character], {{},[Character].[Character].[All].&[FOO]}, ALL)");
        cy.assertTableRowCount(table2, 2);
        cy.assertTableCellContent(table2, 0, 0, "bar");
        cy.assertTableCellContent(table2, 1, 0, "empty-character");

    });

});