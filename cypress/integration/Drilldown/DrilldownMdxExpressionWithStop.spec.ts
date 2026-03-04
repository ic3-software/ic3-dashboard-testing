export {};

describe("Drilldown/User Select", () => {

    const table1 = "ww0";
    const table2 = "ww1";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldown MDX Expression With Stop");
        cy.waitForQueryCount(4);
    });

    it("pivot table", () => {

        const widgetId = "ww1";

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* All Regions */);
        cy.waitForQueryCount(5);
        cy.assertPivotTableRowCount(widgetId, 6);

        cy.drilldownPivotTableLeftHeader(widgetId, 4, 0 /* 2021 */);
        cy.waitForQueryCount(6);
        cy.assertPivotTableRowCount(widgetId, 6 + 5);
        cy.assertPivotTableCell(widgetId, 4, 0, "€1,303,900");
        cy.assertPivotTableCell(widgetId, 4 + 1, 0, "€27,500");
        cy.assertPivotTableCell(widgetId, 4 + 2, 0, "€1,034,000");

        cy.assertNoDrilldownPivotTableLeftHeader(widgetId, 8, 0 /* Platinum */);

    });

    it("pivot table 2", () => {

        const widgetId = "ww0";

        cy.assertDrilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.assertDrilldownPivotTableLeftHeader(widgetId, 1, 0 /* 2019 */);
        cy.assertDrilldownPivotTableLeftHeader(widgetId, 2, 0 /* 2020 */);
        cy.assertNoDrilldownPivotTableLeftHeader(widgetId, 3, 0 /* 2021 */);
        cy.assertNoDrilldownPivotTableLeftHeader(widgetId, 4, 0 /* 2022 */);

    });

    it("pivot table 3", () => {

        const widgetId = "ww2";

        cy.assertDrilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.assertNoDrilldownPivotTableLeftHeader(widgetId, 1, 0 /* 2019 */);
        cy.assertDrilldownPivotTableLeftHeader(widgetId, 2, 0 /* 2020 */);
        cy.assertDrilldownPivotTableLeftHeader(widgetId, 3, 0 /* 2021 */);
        cy.assertDrilldownPivotTableLeftHeader(widgetId, 4, 0 /* 2022 */);

    });
});
