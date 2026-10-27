export {};

describe("Drilldown/User Select", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldown MDX Expression");
        cy.waitForQueryCount(2);
    });

    it("pivot table", () => {

        const widgetId = "ww1";

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* All Regions */);
        cy.waitForQueryCount(3);
        cy.assertPivotTableRowCount(widgetId, 6);

        cy.drilldownPivotTableLeftHeader(widgetId, 4, 0 /* 2021 */);
        cy.waitForQueryCount(4);
        cy.assertPivotTableRowCount(widgetId, 6 + 5);
        cy.assertPivotTableCell(widgetId, 4, 0, "€1,303,900");
        cy.assertPivotTableCell(widgetId, 4 + 1, 0, "€27,500");
        cy.assertPivotTableCell(widgetId, 4 + 2, 0, "€1,034,000");

        cy.drilldownPivotTableLeftHeader(widgetId, 8, 0 /* Platinum */);
        cy.waitForQueryCount(5);
        cy.assertPivotTableRowCount(widgetId, 6 + 5 + 2);
        cy.assertPivotTableCell(widgetId, 4, 0, "€1,303,900");
        cy.assertPivotTableCell(widgetId, 4 + 1, 0, "€27,500");
        cy.assertPivotTableCell(widgetId, 4 + 2, 0, "€1,034,000");
        cy.assertPivotTableCell(widgetId, 4 + 4, 0, "€9,600");
        cy.assertPivotTableCell(widgetId, 4 + 5, 0, "€8,400");
        cy.assertPivotTableCell(widgetId, 4 + 6, 0, "€1,200");

    });

    // M-22 : $axis in an MDX-expression drilldown must be replaced by the axis members (not {}).
    // Report change needed : add ww2 Pivot Table, Drilldown MDX Expression "Except($member.children, $axis)", MDX
    // SELECT [Measures].[Amount] ON 0, {[Geography].[Geography].[All Regions], [Geography].[Geography].[Continent].[Europe]} ON 1 FROM [Sales]
    // (and beforeEach waitForQueryCount(1) => 2).
    it("ww2: $axis is replaced by the axis members", () => {

        const widgetId = "ww0";

        cy.waitForQueryCount(2);
        cy.assertPivotTableRowCount(widgetId, 1);

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0);
        cy.waitForQueryCount(3);

        // Europe (already on the axis) is not re-inserted (bug: 2 + 6 rows)
        cy.assertPivotTableRowCount(widgetId, 1 + 6);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "All Regions");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Africa");
        cy.assertPivotTableLeftHeader(widgetId, 2, 0, "Asia");
        cy.assertPivotTableLeftHeader(widgetId, 3, 0, "Europe");
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "North America");
        cy.assertPivotTableLeftHeader(widgetId, 5, 0, "Oceania");
        cy.assertPivotTableLeftHeader(widgetId,6, 0, "South America");

    });
});
