export {};

const data = [
    [1184.02, 428.57, 633.36, 849.84, 1280.06],
    [639.51, 839.07, 1161.88, 737.15, 848.46],
    [690.17, 644.52, 1166.51, 1079.63, 1176.15],
    [626.69, 610.61, 927.74, 675.26, 709.34]
]

function assertPivotTableData(ww: string) {
    for (let iRow = 0; iRow < data.length; iRow++) {
        const row = data[iRow];
        for (let iCol = 0; iCol < row.length; iCol++) {
            cy.assertPivotTableCell(ww, iRow, iCol, String(row[iCol]));
        }
    }
}

describe("Tables/Pivot Table SQL Source", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table SQL");
        cy.waitForQueryCount(2);
    });

    it("sql source equal to mdx source -> sorting", () => {

        const widgetIdSQL = "ww0";
        const widgetIdMDX = "ww1";

        assertPivotTableData(widgetIdSQL);
        assertPivotTableData(widgetIdMDX);

        cy.sortPivotTable(widgetIdSQL, 1);
        cy.sortPivotTable(widgetIdMDX, 1);
        cy.assertPivotTableColumnsEqual(widgetIdSQL, widgetIdMDX, data.length, data[0].length + 1);

        cy.sortPivotTable(widgetIdSQL, 4);
        cy.sortPivotTable(widgetIdMDX, 4);
        cy.assertPivotTableColumnsEqual(widgetIdSQL, widgetIdMDX, data.length, data[0].length + 1);

        // Reset sorting
        cy.sortPivotTable(widgetIdSQL, 0);
    })

    it("sql source equal to mdx source -> selection", () => {

        const tableSQL = "ww0";
        const tableSQLEvent = "ww2";

        cy.selectPivotTableCell(tableSQL, 1, 0);
        cy.assertEventValue(tableSQLEvent, "Family");
        cy.assertEventMdx(tableSQLEvent, "Family");

        cy.selectPivotTableCell(tableSQL, 2, 0);
        cy.assertEventValue(tableSQLEvent, "Sci-Fi");
        cy.assertEventMdx(tableSQLEvent, "Sci-Fi");

        cy.selectPivotTableCell(tableSQL, 3, 0);
        cy.assertEventValue(tableSQLEvent, "Travel");
        cy.assertEventMdx(tableSQLEvent, "Travel");

    })

});
