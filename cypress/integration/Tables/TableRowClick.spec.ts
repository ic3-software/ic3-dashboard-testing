export {};

describe("Tables/Table Row Click", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Row Click");
        cy.waitForQueryCount(3);
    });

    const table1 = "ww0";
    const table2 = "ww2";
    const table3 = "ww1";

    it("click events", () => {

        cy.assertTableRowCount(table1, 5);
        cy.assertTableRowCount(table2, 5);
        cy.assertTableRowCount(table3, 5);

        function clickAndCheck(clickTable: string) {
            cy.clickTableRow(clickTable, 1);
            cy.assertTableRowCount(table3, 1);
            cy.assertTableCellContent(table3, 0, 0, "Server");

            cy.clickTableRow(clickTable, 2);
            cy.assertTableRowCount(table3, 1);
            cy.assertTableCellContent(table3, 0, 0, "Silver");
        }

        clickAndCheck(table1);
        clickAndCheck(table2);
        clickAndCheck(table1);

    })


});
