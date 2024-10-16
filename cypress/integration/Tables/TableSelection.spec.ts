export {};

describe("Tables/Table Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Selection");
        cy.waitForQueryCount(3);
    });

    it("row count", () => {

        const table1 = "ww0";
        const table2 = "ww1";
        const table3 = "ww2";
        cy.assertTableRowCount(table1, 5);
        cy.assertTableRowCount(table2, 2);
        cy.assertTableRowCount(table3, 5);

    })

    it("table1 single selection and deselection", () => {

        const table = "ww0";
        const tableEvent = "ww3";
        cy.clickTableCell(table, 0, 0);
        cy.assertEventValue(tableEvent, "2018");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2018-01-01]");

        cy.clickTableCell(table, 0, 0);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

    })

    it("table1 multiple selection", () => {

        const table = "ww0";
        const tableEvent = "ww3";
        cy.clickTableCell(table, 1, 0, true);
        cy.clickTableCell(table, 2, 0, true);
        cy.clickTableCell(table, 3, 0, true);
        cy.assertEventValue(tableEvent, "2019, 2020, 2021");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2019-01-01],[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2021-01-01]}");

    })

    it("table2 single selection and deselection", () => {

        const table = "ww1";
        const tableEvent = "ww4";
        cy.clickTableCell(table, 1, 2);
        cy.assertEventValue(tableEvent, "#Sales");
        cy.assertEventMdx(tableEvent, "[Measures].[#Sales]");

        cy.clickTableCell(table, 1, 2);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

    })

    it("table2 multiple selection", () => {

        const table = "ww1";
        const tableEvent = "ww4";
        cy.clickTableCell(table, 0, 0, true);
        cy.clickTableCell(table, 1, 0, true);
        cy.assertEventValue(tableEvent, "Amount, #Sales");
        cy.assertEventMdx(tableEvent, "{[Measures].[Amount],[Measures].[#Sales]}");

    })


    it("table3 single selection and deselection", () => {

        const table = "ww2";
        const tableEvent = "ww5";
        cy.clickTableCell(table, 1, 2);
        cy.assertEventValue(tableEvent, "(Server, Global South)");
        cy.assertEventMdx(tableEvent, "([Product].[Article].[Article].&[2],[Geography].[Classification].[Hemisphere].&[GLOBAL SOUTH])");

        cy.clickTableCell(table, 1, 2);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

    })

    it("table3 multiple selection", () => {

        const table = "ww2";
        const tableEvent = "ww5";
        cy.clickTableCell(table, 2, 2, true);
        cy.clickTableCell(table, 3, 1, true);
        cy.assertEventValue(tableEvent, "(Silver, Global South), (Gold, Global North)");
        cy.assertEventMdx(tableEvent, "{([Product].[Article].[Article].&[3],[Geography].[Classification].[Hemisphere].&[GLOBAL SOUTH]),([Product].[Article].[Article].&[4],[Geography].[Classification].[Hemisphere].&[GLOBAL NORTH])}");

    })


});
