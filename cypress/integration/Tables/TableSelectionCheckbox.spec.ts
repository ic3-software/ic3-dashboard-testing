export {};

describe("Tables/Table Selection II", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Selection II");
        cy.waitForQueryCount(2);
    });

    it("test selection", () => {

        const table1 = "ww0";
        const table2 = "ww1";

        const tableEvent = "ww3";

        cy.assertTableRowCount(table1, 5);
        cy.assertTableRowCount(table2, 5);

        // First selection
        cy.clickTableCell(table1, 0, 0);
        cy.assertEventValue(tableEvent, "2018");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2018-01-01]");
        cy.assertTableCellSelected(table1, 0, 1);
        cy.assertTableCellSelected(table2, 0, 1);

        // Add second selection
        cy.clickTableCell(table1, 3, 0);
        cy.assertEventValue(tableEvent, "2018, 2021");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Year].&[2021-01-01]}");
        cy.assertTableCellSelected(table1, 0, 1);
        cy.assertTableCellSelected(table1, 3, 1);
        cy.assertTableCellSelected(table2, 0, 1);
        cy.assertTableCellSelected(table2, 3, 1);

        // Deselect all
        cy.clickHeaderCheckbox(table1);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

        // Select all
        cy.clickHeaderCheckbox(table1);
        cy.assertEventValue(tableEvent, "2018, 2019, 2020, 2021, 2022");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Year].&[2019-01-01],[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2021-01-01],[Time].[Time].[Year].&[2022-01-01]}");
        cy.assertTableCellSelected(table1, 0, 1);
        cy.assertTableCellSelected(table1, 1, 1);
        cy.assertTableCellSelected(table1, 2, 1);
        cy.assertTableCellSelected(table1, 3, 1);
        cy.assertTableCellSelected(table1, 4, 1);
        cy.assertTableCellSelected(table2, 0, 1);
        cy.assertTableCellSelected(table2, 1, 1);
        cy.assertTableCellSelected(table2, 2, 1);
        cy.assertTableCellSelected(table2, 3, 1);
        cy.assertTableCellSelected(table2, 4, 1);

    });


});
