export {};

describe("Drilldown/Drilldowns Replays 2", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns Replays II");
        cy.waitForQueryCount(3);
    });

    it("Test Table drilldown like Pivot", () => {

        const tableId = "ww0"
        const pivotId = "ww1"
        const buttonId = "ww2"

        cy.assertPivotTableRowCount(pivotId, 5);
        cy.assertTableRowCount(tableId, 5);

        const queryCount = 3;

        cy.assertTableValue(tableId, 0, 0, "2018");
        cy.assertTableValue(tableId, 0, 1, "€522,150");
        cy.assertPivotTableCell(pivotId, 0, 0, "€522,150");

        // drilldown Table
        cy.clickTableCell(tableId, 0, 0);
        cy.waitForQueryCount(queryCount + 1); // drilldown
        cy.assertTableRowCount(tableId, 5 + 4);
        cy.assertTableValue(tableId, 0, 0, "2018");
        cy.assertTableValue(tableId, 1, 0, "2018 Q1");
        cy.assertTableValue(tableId, 0, 1, "€522,150");
        cy.assertTableValue(tableId, 1, 1, "€83,100");

        // Click on middle east to get empty results + replay drilldown
        cy.selectButton(buttonId, 'Middle east');
        cy.waitForQueryCount(queryCount + 1 + 3);  // + 2 Table + 1 Pivot
        cy.assertTableRowCount(tableId, 5 + 4);
        cy.assertTableValue(tableId, 0, 0, "2018");
        cy.assertTableValue(tableId, 1, 0, "2018 Q1");
        cy.assertTableValue(tableId, 0, 1, "");
        cy.assertTableValue(tableId, 1, 1, "");


        // Pivot Table
        cy.assertPivotTableCell(pivotId, 0, 0, "");
        cy.drilldownPivotTableLeftHeader(pivotId, 0, 0);
        cy.assertPivotTableRowCount(pivotId, 5 + 4);
        cy.assertPivotTableCell(pivotId, 0, 0, "");
        cy.assertPivotTableCell(pivotId, 1, 0, "");
        cy.assertPivotTableCell(pivotId, 2, 0, "");

    })

});
