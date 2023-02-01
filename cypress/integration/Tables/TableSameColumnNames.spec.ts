export {};

describe("Tables/Table Same Column Names", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Same Column Names");
        cy.waitForQueryCount(2);
    });

    it("row count", () => {

        cy.assertTableRowCount("ww0", 1);
        cy.assertTableCellContent("ww0", 0, 0, "Business")
        cy.assertTableCellContent("ww0", 0, 1, "207")
        cy.assertTableCellContent("ww0", 0, 2, "207")

        cy.assertTableRowCount("ww1", 1);
        cy.assertTableCellContent("ww1", 0, 0, "true")
        cy.assertTableCellContent("ww1", 0, 1, "2")

        cy.assertTableRowCount("ww3", 1);
        cy.assertTableCellContent("ww3", 0, 0, "1")
        cy.assertTableCellContent("ww3", 0, 1, "2")
    })

});
