export {};

describe("Drilldown/User Select", () => {

    const table1 = "ww0";
    const table2 = "ww1";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldown MDX Expression");
        cy.waitForQueryCount(1);
    });

    it("pivot table", () => {

        const widgetId = "ww1";

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* All Regions */);
        cy.waitForQueryCount(2);
        cy.assertPivotTableRowCount(widgetId, 6);

        cy.drilldownPivotTableLeftHeader(widgetId, 4, 0 /* 2021 */);
        cy.waitForQueryCount(3);
        cy.assertPivotTableRowCount(widgetId, 6 + 5);
        cy.assertPivotTableCell(widgetId, 4, 0, "€1,303,900");
        cy.assertPivotTableCell(widgetId, 4 + 1, 0, "€27,500");
        cy.assertPivotTableCell(widgetId, 4 + 2, 0, "€1,034,000");

        cy.drilldownPivotTableLeftHeader(widgetId, 8, 0 /* Platinum */);
        cy.waitForQueryCount(4);
        cy.assertPivotTableRowCount(widgetId, 6 + 5 + 2);
        cy.assertPivotTableCell(widgetId, 4, 0, "€1,303,900");
        cy.assertPivotTableCell(widgetId, 4 + 1, 0, "€27,500");
        cy.assertPivotTableCell(widgetId, 4 + 2, 0, "€1,034,000");
        cy.assertPivotTableCell(widgetId, 4 + 4, 0, "€9,600");
        cy.assertPivotTableCell(widgetId, 4 + 5, 0, "€8,400");
        cy.assertPivotTableCell(widgetId, 4 + 6, 0, "€1,200");

    });
});
