export {};

const EMPTY = "ic3-empty";

describe("Tables/Table Selection Totals", () => {

    const table1 = "ww0";
    const table2 = "ww1";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Selection Totals");
        cy.waitForQueryCount(2);
    });

    it("row count", () => {
        cy.assertTableRowCount(table1, 6);
        cy.assertTableRowCount(table2, 11);
    });

    it("table1 single selection and deselection", () => {

        const tableEvent = "ww3";

        // Select 2018
        cy.clickTableCell(table1, 0, 0);
        cy.assertEventValue(tableEvent, "2018");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2018-01-01]");

        cy.clickTableCell(table1, 0, 0);
        cy.assertEventValue(tableEvent, EMPTY);
        cy.assertEventMdx(tableEvent, EMPTY);

        // Select Total
        cy.clickTableCell(table1, 5, 0);
        cy.assertEventValue(tableEvent, EMPTY);
        cy.assertEventMdx(tableEvent, EMPTY);

    });

    it("table1 multiple selection", () => {

        const table = "ww0";
        const tableEvent = "ww3";
        cy.clickTableCell(table, 1, 0, true);
        cy.clickTableCell(table, 5, 0, true); // Select total. Should not add to selection.
        cy.clickTableCell(table, 3, 0, true);
        cy.assertEventValue(tableEvent, "2019, 2021");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2019-01-01],[Time].[Time].[Year].&[2021-01-01]}");

    });

    it("table2 single selection and deselection", () => {

        const tableEvent = "ww2";
        cy.clickTableCell(table2, 0, 0);
        cy.assertEventValue(tableEvent, "(Business, 2018)");
        cy.assertEventMdx(tableEvent, "([Customer].[Customer].[Type].&[Business],[Time].[Time].[Year].&[2018-01-01])");

        // Select subtotal Business
        cy.clickTableCell(table2, 4, 0);
        cy.assertEventValue(tableEvent, "Business");
        cy.assertEventMdx(tableEvent, "[Customer].[Customer].[Type].&[Business]");
        
        // Select subtotal Consumer
        cy.clickTableCell(table2, 9, 0);
        cy.assertEventValue(tableEvent, "Consumer");
        cy.assertEventMdx(tableEvent, "[Customer].[Customer].[Type].&[Consumer]");
        
        // Select full total
        cy.clickTableCell(table2, 10, 0);
        cy.assertEventValue(tableEvent, EMPTY);
        cy.assertEventMdx(tableEvent, EMPTY);

    });

    it("table2 multiple selection", () => {

        const tableEvent = "ww2";
        cy.clickTableCell(table2, 0, 0, true);
        cy.assertEventValue(tableEvent, "(Business, 2018)");
        cy.assertEventMdx(tableEvent, "([Customer].[Customer].[Type].&[Business],[Time].[Time].[Year].&[2018-01-01])");

        // Select subtotal Business
        cy.clickTableCell(table2, 4, 0, true);
        cy.assertEventValue(tableEvent, "(Business, 2018), Business");
        cy.assertEventMdx(tableEvent, "{([Customer].[Customer].[Type].&[Business],[Time].[Time].[Year].&[2018-01-01]),[Customer].[Customer].[Type].&[Business]}");

        // Select subtotal Consumer
        cy.clickTableCell(table2, 9, 0, true);
        cy.assertEventValue(tableEvent, "(Business, 2018), Business, Consumer");
        cy.assertEventMdx(tableEvent, "{([Customer].[Customer].[Type].&[Business],[Time].[Time].[Year].&[2018-01-01]),[Customer].[Customer].[Type].&[Business],[Customer].[Customer].[Type].&[Consumer]}");

        // Select full total → this one is ignored.
        cy.clickTableCell(table2, 10, 0, true);
        cy.assertEventValue(tableEvent, "(Business, 2018), Business, Consumer");
        cy.assertEventMdx(tableEvent, "{([Customer].[Customer].[Type].&[Business],[Time].[Time].[Year].&[2018-01-01]),[Customer].[Customer].[Type].&[Business],[Customer].[Customer].[Type].&[Consumer]}");


    });
});
