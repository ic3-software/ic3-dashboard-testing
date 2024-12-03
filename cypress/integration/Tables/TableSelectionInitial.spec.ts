export {};

describe("Tables/Table Selection Initial", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Selection Initial");
        cy.waitForQueryCount(2);
    });

    const table1 = "ww0";
    const table2 = "ww1";

    it("row count & initial state", () => {

        cy.assertTableRowCount(table1, 10);
        cy.assertTableRowCount(table2, 1);

        cy.assertTableValue(table1, 0, 0, "Thistle Corp.");
        cy.assertTableRowSelected(table1, 0);  // Thistle Corp. selected
        cy.assertTableValue(table2, 0, 0, "Switzerland");
        cy.assertTableRowNotSelected(table2, 0);  // Switzerland not selected

    });

    it("table1 selection updates table2", () => {

        cy.assertTableValue(table1, 2, 0, "Daisy Ltd.");
        cy.clickTableCell(table1, 2, 0);  // Click Daisy Ltd.
        cy.assertTableRowSelected(table1, 2);
        cy.assertTableRowCount(table2, 1);
        cy.assertTableValue(table2, 0, 0, "France");
        cy.assertTableRowNotSelected(table2, 0);  // France not selected

    });

});
