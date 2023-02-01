export {};

describe("Tables/Table Selection Synchronization", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table selection synchronization");
        cy.waitForQueryCount(6);
    });

    it("row count", () => {

        cy.assertTableRowCount("ww0", 5);
        cy.assertTableRowCount("ww1", 5);
        cy.assertTableRowCount("ww2", 5);
        cy.assertTableRowCount("ww3", 5);
        cy.assertTableRowCount("ww4", 5);
        cy.assertTableRowCount("ww5", 5);

    })

    it("table1 & table2 sync row", () => {

        const table1 = "ww0";
        const table2 = "ww1";
        cy.clickTableCell(table1, 2, 0);
        cy.clickTableCell(table1, 4, 0, true);

        cy.assertTableRowSelected(table1, 2);
        cy.assertTableRowSelected(table1, 4);
        cy.assertTableRowSelected(table2, 2);
        cy.assertTableRowSelected(table2, 4);

    })

    it("table3 & table4 sync column", () => {

        const table1 = "ww2";
        const table2 = "ww3";
        cy.clickTableCell(table1, 0, 1);
        cy.clickTableCell(table1, 0, 2, true);

        cy.assertTableColumnSelected(table1, 1);
        cy.assertTableColumnSelected(table1, 2);
        cy.assertTableColumnSelected(table2, 1);
        cy.assertTableColumnSelected(table2, 2);
    })

    it("table5 & table6 sync cell", () => {

        const table1 = "ww4";
        const table2 = "ww5";
        cy.clickTableCell(table1, 1, 1);
        cy.clickTableCell(table1, 3, 2, true);

        cy.assertTableCellSelected(table1, 1, 1);
        cy.assertTableCellSelected(table1, 3, 2);
        cy.assertTableCellSelected(table2, 1, 1);
        cy.assertTableCellSelected(table2, 3, 2);

    })

});
