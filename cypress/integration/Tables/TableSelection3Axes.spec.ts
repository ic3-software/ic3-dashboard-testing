export {};

function assertColumnSelected(wTableId: string, colIdx: number, colCount: number) {
    for (let iCol = 0; iCol < colCount; iCol++) {
        if (iCol === colIdx) {
            cy.assertTableColumnSelected(wTableId, colIdx);
        } else {
            cy.assertTableColumnNotSelected(wTableId, iCol);
        }
    }
}

function assertRowSelected(wTableId: string, rowIdx: number, rowCount: number) {
    for (let iRow = 0; iRow < rowCount; iRow++) {
        if (iRow === rowIdx) {
            cy.assertTableRowSelected(wTableId, rowIdx);
        } else {
            cy.assertTableRowNotSelected(wTableId, iRow);
        }
    }
}

describe("Tables/Table Selection 3 axes", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Selection 3 axes");
        cy.waitForQueryCount(3);
    });

    it("row count", () => {

        const table1 = "ww0";
        const table2 = "ww1";
        const table3 = "ww4";
        cy.assertTableRowCount(table1, 4);
        cy.assertTableRowCount(table2, 4);
        cy.assertTableRowCount(table3, 4);

    })

    it("table1 columns single selection", () => {

        const table = "ww0";
        const tableEvent = "ww3";

        cy.clickTableCell(table, 0, 0);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");
        assertColumnSelected(table, -1, 6);
        cy.wait(10)

        cy.clickTableCell(table, 0, 1);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");
        assertColumnSelected(table, -1, 6);
        cy.wait(10)

        cy.clickTableCell(table, 0, 2);
        cy.assertEventValue(tableEvent, "(Global North, Business)");
        cy.assertEventMdx(tableEvent, "([Geography].[Classification].[Hemisphere].&[Global North],[Customer].[Customer].[Type].&[Business])");
        assertColumnSelected(table, 2, 6);

        cy.wait(10)
        cy.clickTableCell(table, 0, 2);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");
        assertColumnSelected(table, -1, 6);  // -1 for no selection

        cy.wait(10)
        cy.clickTableCell(table, 0, 3);
        cy.assertEventValue(tableEvent, "(Global North, Consumer)");
        cy.assertEventMdx(tableEvent, "([Geography].[Classification].[Hemisphere].&[Global North],[Customer].[Customer].[Type].&[Consumer])");
        assertColumnSelected(table, 3, 6);  // -1 for no selection
    })

    it("table2 rows single selection", () => {

        const table = "ww1";
        const tableEvent = "ww2";

        cy.clickTableCell(table, 1, 0);
        cy.assertEventValue(tableEvent, "(2018, Support)");
        cy.assertEventMdx(tableEvent, "([Time].[Time].[Year].&[2018-01-01],[Product].[Product].[Category].&[2])");
        assertRowSelected(table, 1, 4);
        cy.wait(10)

        cy.clickTableCell(table, 1, 5);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");
        assertRowSelected(table, -1, 4);
        cy.wait(10)

        cy.clickTableCell(table, 2, 2);
        cy.assertEventValue(tableEvent, "(2019, License)");
        cy.assertEventMdx(tableEvent, "([Time].[Time].[Year].&[2019-01-01],[Product].[Product].[Category].&[1])");
        assertRowSelected(table, 2, 4);

    })

    it("table3 cells single selection", () => {

        const table = "ww4";
        const tableEvent = "ww5";
        cy.clickTableCell(table, 1, 4);
        cy.assertEventValue(tableEvent, "(2018, Support, Global South, Business)");
        cy.assertEventMdx(tableEvent, "([Time].[Time].[Year].&[2018-01-01],[Product].[Product].[Category].&[2],[Geography].[Classification].[Hemisphere].&[Global South],[Customer].[Customer].[Type].&[Business])");

        cy.clickTableCell(table, 1, 4);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

    })


});
